import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketsService } from '@client/tickets/tickets.service';
import { FormService } from '@client/core/services/form.service';
import { Priority, SelectOption, Ticket, TicketStatus } from '@client/tickets/models';
import { PROJECT_ALIAS } from '@client/core/types/constants';
import { EditableFields } from '@client/tickets/components/ticket-details-modal/ticket-details-modal.component';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss'],
})
export class TicketFormComponent implements OnInit {
  @Input() tickets: Ticket[] = [];
  @Input() ticket?: Ticket;
  @Input() authorId!: number;
  @Input() usersOptions: SelectOption[] = [];

  @Output() formControlFocus = new EventEmitter<EditableFields>();
  editableFields = EditableFields;
  editedTextField = null;

  form: FormGroup = new FormGroup({});

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


  constructor(
    private formBuilder: FormBuilder,
    private ticketsService: TicketsService,
    private formService: FormService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.ticketsOptions = this.createTicketsOptions(this.tickets);
  }

  get titleCtrl(): FormControl {
    return this.form.get('ticketBody.title') as FormControl;
  }

  get authorIdCtrl(): FormControl {
    return this.form.get('ticketBody.authorId') as FormControl;
  }

  get assigneeIdCtrl(): FormControl {
    return this.form.get('ticketBody.assigneeId') as FormControl;
  }

  get statusCtrl(): FormControl {
    return this.form.get('ticketBody.status') as FormControl;
  }

  get priorityCtrl(): FormControl {
    return this.form.get('ticketBody.priority') as FormControl;
  }

  get relatedTicketIdCtrl(): FormControl {
    return this.form.get('ticketBody.relatedTicketId') as FormControl;
  }

  get descriptionCtrl(): FormControl {
    return this.form.get('ticketBody.description') as FormControl;
  }

  createForm(): void {
    // const { ticket, authorId } = this.data;
    this.form = this.formBuilder.group({
      ticketBody: this.formBuilder.group({
        title: [
          this.ticket?.title ?? '',
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
            value: this.authorId,
            disabled: true,
          },
        ],
        assigneeId: [this.ticket?.assigneeId ?? -1],
        status: [
          {
            value: this.ticket?.status ?? this.statusOptions[0].value,
            disabled: !this.ticket,
          },
        ],
        priority: [this.ticket?.priority ?? this.priorityOptions[2].value],
        description: [this.ticket?.description ?? ''],
        relatedTicketId: [this.ticket?.relatedTicketId ?? -1],
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

  createTicketsOptions(tickets: Ticket[]): SelectOption[] {
    const empty: SelectOption = { value: -1, viewValue: '-' };
    const result = tickets
      .filter((t) => t.id !== this.ticket?.id)
      .map((t) => ({
        value: t.id,
        viewValue: `${this.getTicketId(+t.id)} ${t.title}`,
      }));
    return [empty, ...result];
  }

  getTicketId(ticketId: number): string {
    return `${PROJECT_ALIAS}-${ticketId}`;
  }

  getInputErrorMessage(control: AbstractControl): string {
    return this.formService.getInputErrorMessage(control);
  }

  onFormControlFocus(name: EditableFields): void {
    this.formControlFocus.emit(name)
  }
}
