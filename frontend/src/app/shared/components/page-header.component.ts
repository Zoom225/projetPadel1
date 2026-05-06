// Fichier: src/app/shared/components/page-header.component.ts
// Composant pour les en-têtes de pages avec un design uniforme

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PageAction {
  label: string;
  route?: string;
  icon?: string;
  primary?: boolean;
  click?: () => void;
}

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-header">
      <!-- Contenu principal -->
      <div class="page-header-content">
        <!-- Icône + Titres -->
        <div class="page-header-titles">
          @if (icon) {
            <span class="page-header-icon">{{ icon }}</span>
          }
          <div>
            <h1 class="page-header-title">{{ title }}</h1>
            @if (subtitle) {
              <p class="page-header-subtitle">{{ subtitle }}</p>
            }
          </div>
        </div>

        <!-- Actions -->
        @if (actions && actions.length > 0) {
          <div class="page-header-actions">
            @for (action of actions; track action.label) {
              @if (action.route) {
                <a [routerLink]="action.route"
                   class="page-action-button"
                   [class.primary]="action.primary">
                  @if (action.icon) {
                    <span>{{ action.icon }}</span>
                  }
                  {{ action.label }}
                </a>
              } @else if (action.click) {
                <button (click)="action.click!()"
                        class="page-action-button"
                        [class.primary]="action.primary">
                  @if (action.icon) {
                    <span>{{ action.icon }}</span>
                  }
                  {{ action.label }}
                </button>
              }
            }
          </div>
        }
      </div>

      <!-- Ligne de décoration -->
      <div class="page-header-line"></div>
    </div>
  `,
  styles: [`
    .page-header {
      @apply mb-8 pb-6;
    }

    .page-header-content {
      @apply flex flex-col md:flex-row items-start md:items-center justify-between gap-6;
      animation: slideDown 0.4s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .page-header-titles {
      @apply flex items-start gap-4;
    }

    .page-header-icon {
      @apply text-5xl flex-shrink-0 animate-bounce-slow;
    }

    .page-header-title {
      @apply text-3xl md:text-4xl font-black text-slate-900 m-0 tracking-tight;
      background: linear-gradient(135deg, #16a34a 0%, #0ea5e9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .page-header-subtitle {
      @apply text-sm md:text-base text-slate-600 m-0 mt-1 font-medium;
    }

    .page-header-actions {
      @apply flex flex-wrap gap-3 items-center justify-end;
    }

    .page-action-button {
      @apply inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 border-2 border-transparent;
      background: white;
      color: #16a34a;
      border-color: #16a34a;
    }

    .page-action-button:hover {
      @apply -translate-y-1 shadow-md;
      background: #f0fdf4;
    }

    .page-action-button.primary {
      @apply bg-gradient-to-r from-padel-600 to-padel-500 text-white border-transparent shadow-padel;
    }

    .page-action-button.primary:hover {
      @apply shadow-padel-lg;
    }

    .page-header-line {
      @apply h-1 w-full bg-gradient-to-r from-padel-600 via-court-600 to-purple-600 rounded-full mt-6 opacity-60;
    }
  `]
})
export class PageHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() icon?: string;
  @Input() actions?: PageAction[];
}

