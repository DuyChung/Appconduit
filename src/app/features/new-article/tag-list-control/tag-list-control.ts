import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-tag-list-control',
  standalone: true,
  templateUrl: './tag-list-control.html',
  styleUrls: ['./tag-list-control.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagListControlComponent),
      multi: true,
    },
  ],
})
export class TagListControlComponent implements ControlValueAccessor {
  tags: string[] = [];
  tagValue = '';
  disabled = false;

  onChange: (value: string[]) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string[]): void {
    this.tags = value || [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  addTag(): void {
    const value = this.tagValue.trim();

    if (!value) return;

    if (this.tags.includes(value)) return;

    this.tags = [...this.tags, value];

    this.onChange(this.tags);
    this.onTouched();

    this.tagValue = '';
  }

  removeTag(index: number): void {
    this.tags = this.tags.filter((_, i) => i !== index);

    this.onChange(this.tags);
    this.onTouched();
  }

  onInput(value: string) {
    this.tagValue = value;
  }
}
