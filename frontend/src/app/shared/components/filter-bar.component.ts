import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FilterOption {
  label: string;
  value: any;
  icon?: string;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-bar">
      <!-- Search input -->
      @if (showSearch) {
        <div class="filter-search">
          <span class="filter-search-icon">🔍</span>
          <input
            type="text"
            class="filter-search-input"
            [placeholder]="searchPlaceholder"
            [(ngModel)]="searchValue"
            (ngModelChange)="onSearchChange($event)"
          />
        </div>
      }

      <!-- Filters -->
      @if (filters && filters.length > 0) {
        <div class="filter-group">
          @for (filter of filters; track filter.value) {
            <button
              type="button"
              class="filter-button"
              [class.active]="filter.value === selectedFilter"
              (click)="selectFilter(filter.value)"
            >
              @if (filter.icon) {
                <span class="filter-icon">{{ filter.icon }}</span>
              }
              {{ filter.label }}
            </button>
          }
        </div>
      }

      <!-- Clear button -->
      @if (showClear && (searchValue || selectedFilter !== null)) {
        <button type="button" class="filter-clear" (click)="onClear()">
          Clear
        </button>
      }
    </div>
  `,
  styles: [`
    .filter-bar {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      align-items: center;
      padding: 1.25rem;
      border-radius: 1rem;
      background: white;
      border: 2px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    @media (max-width: 768px) {
      .filter-bar {
        flex-direction: column;
        align-items: stretch;
      }
    }

    .filter-search {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 1;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
    }

    .filter-search-icon {
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    .filter-search-input {
      flex: 1;
      background: transparent;
      outline: none;
      font-weight: 500;
      color: #1e293b;
      border: none;
    }

    .filter-search-input::placeholder {
      color: #cbd5e1;
    }

    .filter-group {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .filter-button {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.875rem;
      border: 2px solid #cbd5e1;
      background: white;
      color: #475569;
      transition: all 0.2s;
      cursor: pointer;
    }

    .filter-button:hover {
      border-color: #16a34a;
      background: #f0fdf4;
    }

    .filter-button.active {
      background: linear-gradient(135deg, #16a34a, #15803d);
      color: white;
      border-color: #16a34a;
      box-shadow: 0 8px 16px rgba(22, 163, 74, 0.2);
    }

    .filter-icon {
      margin-right: 0.5rem;
    }

    .filter-clear {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.875rem;
      background: #fee2e2;
      color: #b91c1c;
      border: 2px solid #fca5a5;
      cursor: pointer;
      transition: all 0.2s;
    }

    .filter-clear:hover {
      background: #fecaca;
    }
  `]
})
export class FilterBarComponent {
  @Input() showSearch: boolean = true;
  @Input() searchPlaceholder: string = 'Search...';
  @Input() filters?: FilterOption[];
  @Input() showClear: boolean = true;
  @Input() selectedFilter: any = null;
  @Input() searchValue: string = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<any>();
  @Output() clear = new EventEmitter<void>();

  onSearchChange(value: string): void {
    this.searchValue = value;
    this.searchChange.emit(value);
  }

  selectFilter(value: any): void {
    this.selectedFilter = value;
    this.filterChange.emit(value);
  }

  onClear(): void {
    this.searchValue = '';
    this.selectedFilter = null;
    this.searchChange.emit('');
    this.filterChange.emit(null);
    this.clear.emit();
  }
}

