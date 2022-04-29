import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, pairwise, startWith, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormService } from '@client/core/services/form.service';
import {
  Comment,
  Priority,
  Ticket,
  TicketStatus,
} from '@client/tickets/models';
import { TicketsService } from '@client/tickets/tickets.service';
import { User } from '@client/core/types';
import { PROJECT_ALIAS } from '@client/core/types/constants';

export interface TicketModalData {
  tickets: Ticket[];
  ticket?: Ticket;
  users: User[];
  authorId: number;
}

interface SelectOption {
  value: number | string;
  viewValue: string;
}

@Component({
  selector: 'app-ticket-details-modal',
  templateUrl: './ticket-details-modal.component.html',
  styleUrls: ['./ticket-details-modal.component.scss'],
})
export class TicketDetailsModalComponent implements OnInit, OnDestroy {
  priorityOptions: SelectOption[] = this.createSelectOptionsFromStringsArray([
    Priority.VERY_LOW,
    Priority.LOW,
    Priority.NORMAL,
    Priority.HIGH,
    Priority.VERY_HIGH,
  ]);
  statusOptions: SelectOption[] = this.createSelectOptionsFromStringsArray([
    TicketStatus.NEW,
    TicketStatus.TO_DO,
    TicketStatus.DESIGN,
    TicketStatus.IN_PROGRESS,
    TicketStatus.REVIEW,
    TicketStatus.TESTING,
    TicketStatus.DONE,
    TicketStatus.CANCELLED,
  ]);
  ticketsOptions: SelectOption[] = [];
  usersOptions: SelectOption[] = [];
  form: FormGroup = new FormGroup({});
  subscriptions = new Subscription();

  editedTextField = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TicketModalData,
    public dialogRef: MatDialogRef<TicketDetailsModalComponent>,
    private formBuilder: FormBuilder,
    private ticketsService: TicketsService,
    private formService: FormService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.ticketsOptions = this.createTicketsOptions(this.data.tickets);
    this.usersOptions = this.createUsersOptions(this.data.users);

    this.handleFormChanges();
  }

  get title(): FormControl {
    return this.form.get('ticketBody.title') as FormControl;
  }

  get assigneeId(): FormControl {
    return this.form.get('ticketBody.assigneeId') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('ticketBody.description') as FormControl;
  }

  get previousComments(): FormArray {
    return this.form.get('comments.previous') as FormArray;
  }

  get newComment(): FormGroup {
    return this.form.get('comments.new') as FormGroup;
  }

  get formHeaderText(): string {
    return this.data.ticket
      ? `Ticket id: ${this.getTicketId(+this.data.ticket.id)}`
      : 'Create a new ticket';
  }

  createForm(): void {
    const { ticket, authorId } = this.data;
    this.form = this.formBuilder.group({
      ticketBody: this.formBuilder.group({
        description: [ticket?.description ?? ''],
        title: [
          ticket?.title ?? '',
          {
            validators: [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(200),
            ],
            updateOn: 'blur',
          },
        ],
        authorId: [
          {
            value: authorId,
            disabled: true,
          },
        ],
        assigneeId: [ticket?.assigneeId ?? -1],
        status: [
          {
            value: ticket?.status ?? this.statusOptions[0].value,
            disabled: !ticket,
          },
        ],
        priority: [ticket?.priority ?? this.priorityOptions[2].value],
        relatedTicketId: [ticket?.relatedTicketId ?? -1],
      }),
      comments: this.formBuilder.group({
        previous: this.formBuilder.array(
          this.createCommentsFormGroupArray(ticket?.comments),
        ),
        new: this.formBuilder.group({
          author: { value: this.data.authorId, disabled: true },
          content: '',
        }),
      }),
    });
  }

  createSelectOptionsFromStringsArray(values: string[]): SelectOption[] {
    const result = [];
    for (const value of values) {
      result.push({ value, viewValue: value.replace(/_/g, ' ') });
    }
    return result;
  }

  createUsersOptions(users: User[]): SelectOption[] {
    const empty: SelectOption = { value: -1, viewValue: '-' };
    const result: SelectOption[] = users.map((u) => ({
      value: u.id,
      viewValue: u.name,
    }));
    return [empty, ...result];
  }

  createCommentsFormGroupArray(comments: Comment[] = []): FormGroup[] {
    return [...comments].reverse().map((c) =>
      this.formBuilder.group({
        author: [{ value: c.authorId, disabled: true }],
        content: [{ value: c.content, disabled: true }],
      }),
    );
  }

  createTicketsOptions(tickets: Ticket[]): SelectOption[] {
    const empty: SelectOption = { value: -1, viewValue: '-' };
    const result = tickets.map((t) => ({
      value: t.id,
      viewValue: `${this.getTicketId(+t.id)} ${t.title}`,
    }));
    return [empty, ...result];
  }

  getTicketId(ticketId: number): string {
    return `${PROJECT_ALIAS}-${ticketId}`;
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const ticketForm = this.form.getRawValue()['ticketBody'];
    const commentsForm = this.form.getRawValue()['comments'];

    // TODO: Remove when testing id done
    console.log(ticketForm);
    console.log(commentsForm);

    // An id of -1 is only a placeholder for null value. This is needed because null cannot be used
    // as a default value in mat-select dropdown, and -1 has to be used instead.
    // But it would not be recognised by the backend.
    const { assigneeId, relatedTicketId } = ticketForm;
    ticketForm.assigneeId = assigneeId === -1 ? null : assigneeId;
    ticketForm.relatedTicketId =
      relatedTicketId === -1 ? null : relatedTicketId;

    // const { ticket } = this.data;
    // const submitAction$ = ticket
    //   ? this.ticketsService.updateTicket(+ticket.id, ticketForm)
    //   : this.ticketsService.createTicket(ticketForm);
    //
    // // TODO: Switch to updating individual fields after they have been touched and blurred.
    // //  Same for comments - save each individually on blur.
    // submitAction$.subscribe({
    //   next: (ticket) => {
    //     this.onClose();
    //
    //     const successMessage = ticket
    //       ? 'The new ticket has been created'
    //       : 'The ticket has been updated';
    //     this.toastr.success(successMessage, 'Success');
    //   },
    // });
  }

  onClose(): void {
    // TODO: Save form onClose if changed
    this.dialogRef.close();
  }

  getInputErrorMessage(control: AbstractControl): string {
    return this.formService.getInputErrorMessage(control);
  }

  onFormControlFocus(name: string): void {
    console.log(name);

    this.editedTextField = name;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private handleFormChanges(): void {
    const initialTitle = this.title.value;
    const titleSub = this.title.valueChanges
      .pipe(
        startWith(initialTitle),
        pairwise(),
        debounceTime(2000),
      )
      .subscribe((value) => {
        console.log('title:', value);
      });

    const assigneeIdSub = this.assigneeId.valueChanges.subscribe((value) => {
      console.log('assigneeId:', value);
    });
    const descriptionSub = this.description.valueChanges.subscribe((value) => {
      console.log('description:', value);
    });
    const newCommentSub = this.newComment.valueChanges.subscribe((value) => {
      console.log('newComment:', value);
    });
    [titleSub, assigneeIdSub, descriptionSub, newCommentSub].forEach((s) => {
      this.subscriptions.add(s);
    });
  }
}
