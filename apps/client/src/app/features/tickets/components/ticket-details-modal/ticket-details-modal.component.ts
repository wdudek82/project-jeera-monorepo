import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormService } from '@client/core/services/form.service';
import {
  TicketComment,
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

enum EditableFields {
  DESCRIPTION = 'description',
  COMMENT = 'comment',
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

  editableFields = EditableFields;
  editedTextField: EditableFields | null = null;

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

    if (this.data.ticket) {
      this.handleExistingTicketChanges();
    }
  }

  get title(): FormControl {
    return this.form.get('ticketBody.title') as FormControl;
  }

  get authorId(): FormControl {
    return this.form.get('ticketBody.authorId') as FormControl;
  }

  get assigneeId(): FormControl {
    return this.form.get('ticketBody.assigneeId') as FormControl;
  }

  get status(): FormControl {
    return this.form.get('ticketBody.status') as FormControl;
  }

  get priority(): FormControl {
    return this.form.get('ticketBody.priority') as FormControl;
  }

  get relatedTicketId(): FormControl {
    return this.form.get('ticketBody.relatedTicketId') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('ticketBody.description') as FormControl;
  }

  get newComment(): FormGroup {
    return this.form.get('comments.new') as FormGroup;
  }

  get previousComments(): FormArray {
    return this.form.get('comments.previous') as FormArray;
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
        description: [ticket?.description ?? ''],
        relatedTicketId: [ticket?.relatedTicketId ?? -1],
      }),
      comments: this.formBuilder.group({
        previous: this.formBuilder.array(
          this.createCommentsFormGroups(ticket?.comments),
        ),
        new: this.formBuilder.group({
          authorId: this.data.authorId,
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

  createCommentsFormGroups(comments: TicketComment[] = []): FormGroup[] {
    console.log(comments);
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
    console.log('submitted');

    if (this.form.invalid) return;
    const ticketForm = this.form.getRawValue()['ticketBody'];
    const commentsForm = this.form.getRawValue()['comments'];

    // TODO: Remove when testing id done
    console.log(ticketForm);
    console.log(commentsForm);

    const { assigneeId, relatedTicketId } = ticketForm;
    ticketForm.assigneeId = this.normaliseFieldValue('assigneeId', assigneeId);
    ticketForm.relatedTicketId = this.normaliseFieldValue(
      'relatedTicketId',
      relatedTicketId,
    );

    this.ticketsService.createTicket(ticketForm).subscribe({
      next: (_ticket) => {
        this.onClose();
        this.toastr.success('The new ticket has been created', 'Success');
      },
    });
  }

  onAddComment(): void {
    // TODO: add this option also for the description
    const { ticket } = this.data;
    if (!ticket) {
      this.toastr.error('Ticket does not exist', 'Error');
      throw new Error('Ticket does not exist');
    }
    this.ticketsService
      .addComment(+ticket.id, this.newComment.value)
      .subscribe({
        next: (comment) => {
          const commentsFormGroup = this.createCommentsFormGroups([comment]);
          this.previousComments.insert(0, commentsFormGroup[0]);
        },
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getInputErrorMessage(control: AbstractControl): string {
    return this.formService.getInputErrorMessage(control);
  }

  onFormControlFocus(name: EditableFields): void {
    this.editedTextField = name;
  }

  handleExistingTicketChanges(): void {
    [
      { control: this.title, name: 'title' },
      { control: this.authorId, name: 'authorId' },
      { control: this.assigneeId, name: 'assigneeId' },
      { control: this.status, name: 'status' },
      { control: this.priority, name: 'priority' },
      { control: this.description, name: 'description' },
      { control: this.relatedTicketId, name: 'relatedTicketId' },
    ].forEach(({ control, name }) => {
      this.subscriptions.add(
        control.valueChanges.subscribe((value) => {
          this.persistFormFieldChange(name, value);
        }),
      );
    });
  }

  persistFormFieldChange(name: string, value: string | number): void {
    const { ticket } = this.data;
    if (this.form.invalid || !ticket) return;

    const normalizedValue = this.normaliseFieldValue(name, value);

    this.ticketsService
      .updateTicket(+ticket.id, { [name]: normalizedValue })
      .subscribe({
        next: (_ticket) => {
          // do nothing
        },
      });
  }

  normaliseFieldValue(
    name: string,
    value: string | number,
  ): string | number | null {
    // An id of -1 is only a placeholder for null value. This is needed because null cannot be used
    // as a default value in mat-select dropdown, and -1 has to be used instead.
    // But it would not be recognised by the backend.
    return ['assigneeId', 'relatedTicketId'].includes(name) && value === -1
      ? null
      : value;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
