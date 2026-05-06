// Fichier: src/app/shared/components/kpi-card.component.ts
// Composant pour afficher les KPIs avec un design moderne

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kpi-card" [class.kpi-accent]="accent" [class.kpi-negative]="negative">
      <!-- Icon circulaire -->
      <div class="kpi-icon-wrapper" [style.background-color]="iconBgColor">
        <span class="kpi-icon">{{ icon }}</span>
      </div>

      <!-- Contenu -->
      <div class="kpi-content">
        <!-- Label -->
        <p class="kpi-label">{{ label }}</p>

        <!-- Valeur principale -->
        <p class="kpi-value">{{ value }}</p>

        <!-- Change info -->
        @if (subtext) {
          <p class="kpi-subtext" [class.positive]="!negative" [class.negative]="negative">
            {{ subtext }}
          </p>
        }
      </div>

      <!-- Ligne de décoration -->
      <div class="kpi-line"></div>
    </div>
  `,
  styles: [`
    .kpi-card {
      @apply relative rounded-2xl bg-white border-2 border-slate-200 p-6 shadow-sm hover:shadow-padel hover:-translate-y-1 transition-all duration-300;
      background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.95));
      overflow: hidden;
    }

    .kpi-accent {
      @apply border-padel-300 bg-gradient-to-br from-padel-50 to-padel-100;
    }

    .kpi-negative {
      @apply border-red-300 bg-gradient-to-br from-red-50 to-orange-100;
    }

    .kpi-icon-wrapper {
      @apply inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4;
      background: linear-gradient(135deg, #dcfce7, #86efac);
    }

    .kpi-accent .kpi-icon-wrapper {
      background: linear-gradient(135deg, #f0fdf4, #bbf7d0);
    }

    .kpi-negative .kpi-icon-wrapper {
      background: linear-gradient(135deg, #fef2f2, #fecaca);
    }

    .kpi-icon {
      @apply text-2xl;
    }

    .kpi-content {
      @apply flex flex-col gap-2;
    }

    .kpi-label {
      @apply text-xs font-bold text-slate-600 uppercase tracking-widest m-0;
    }

    .kpi-value {
      @apply text-3xl md:text-4xl font-black text-slate-900 m-0 tracking-tight;
    }

    .kpi-subtext {
      @apply text-sm font-semibold m-0;
    }

    .kpi-subtext.positive {
      @apply text-emerald-700;
    }

    .kpi-subtext.negative {
      @apply text-red-700;
    }

    .kpi-line {
      @apply absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-padel-600 via-court-600 to-transparent opacity-0 transition-all duration-300;
    }

    .kpi-card:hover .kpi-line {
      @apply opacity-100;
    }
  `]
})
export class KpiCardComponent {
  @Input() icon: string = '📊';
  @Input() label: string = '';
  @Input() value: string | number = 0;
  @Input() subtext?: string;
  @Input() accent: boolean = false;
  @Input() negative: boolean = false;
  @Input() iconBgColor: string = '';

  get computedBgColor(): string {
    if (this.iconBgColor) return this.iconBgColor;
    if (this.negative) return '#fee2e2';
    if (this.accent) return '#dcfce7';
    return '#dbeafe';
  }
}

