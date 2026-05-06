// Fichier: src/app/shared/components/status-badge.component.ts
// Composant réutilisable pour les badges de statut

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="status-badge" [class]="badgeClass">
      <span class="badge-icon">{{ icon }}</span>
      <span class="badge-text">{{ text }}</span>
    </span>
  `,
  styles: [`
    .status-badge {
      @apply inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200;
    }

    .badge-icon {
      @apply text-sm;
    }

    /* Statuts de réservation */
    .badge-confirmed {
      @apply bg-emerald-100 text-emerald-800 border border-emerald-300;
    }

    .badge-pending {
      @apply bg-amber-100 text-amber-800 border border-amber-300;
    }

    .badge-cancelled {
      @apply bg-red-100 text-red-800 border border-red-300;
    }

    .badge-waiting {
      @apply bg-blue-100 text-blue-800 border border-blue-300;
    }

    /* Statuts de paiement */
    .badge-paid {
      @apply bg-green-100 text-green-800 border border-green-300;
    }

    .badge-unpaid {
      @apply bg-orange-100 text-orange-800 border border-orange-300;
    }

    .badge-refunded {
      @apply bg-purple-100 text-purple-800 border border-purple-300;
    }

    /* Statuts de match */
    .badge-public {
      @apply bg-padel-100 text-padel-800 border border-padel-300;
    }

    .badge-private {
      @apply bg-violet-100 text-violet-800 border border-violet-300;
    }

    .badge-full {
      @apply bg-red-100 text-red-800 border border-red-300;
    }

    :hover {
      @apply shadow-md;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status!: string;
  @Input() type: 'reservation' | 'payment' | 'match' = 'reservation';

  get badgeClass(): string {
    const baseClass = 'status-badge';
    const statusLower = this.status?.toLowerCase() || '';

    if (this.type === 'reservation') {
      if (statusLower.includes('confirm')) return baseClass + ' badge-confirmed';
      if (statusLower.includes('pending') || statusLower.includes('en attente')) return baseClass + ' badge-pending';
      if (statusLower.includes('cancel')) return baseClass + ' badge-cancelled';
      if (statusLower.includes('waiting')) return baseClass + ' badge-waiting';
    }

    if (this.type === 'payment') {
      if (statusLower.includes('paid') || statusLower.includes('paye')) return baseClass + ' badge-paid';
      if (statusLower.includes('unpaid') || statusLower.includes('non paye')) return baseClass + ' badge-unpaid';
      if (statusLower.includes('refund')) return baseClass + ' badge-refunded';
    }

    if (this.type === 'match') {
      if (statusLower.includes('public')) return baseClass + ' badge-public';
      if (statusLower.includes('private') || statusLower.includes('prive')) return baseClass + ' badge-private';
      if (statusLower.includes('full') || statusLower.includes('complet')) return baseClass + ' badge-full';
    }

    return baseClass + ' badge-pending';
  }

  get icon(): string {
    const statusLower = this.status?.toLowerCase() || '';

    if (this.type === 'reservation') {
      if (statusLower.includes('confirm')) return '✅';
      if (statusLower.includes('pending') || statusLower.includes('en attente')) return '⏳';
      if (statusLower.includes('cancel')) return '❌';
      if (statusLower.includes('waiting')) return '👀';
    }

    if (this.type === 'payment') {
      if (statusLower.includes('paid') || statusLower.includes('paye')) return '✅';
      if (statusLower.includes('unpaid') || statusLower.includes('non paye')) return '🚫';
      if (statusLower.includes('refund')) return '↩️';
    }

    if (this.type === 'match') {
      if (statusLower.includes('public')) return '🌍';
      if (statusLower.includes('private') || statusLower.includes('prive')) return '🔒';
      if (statusLower.includes('full') || statusLower.includes('complet')) return '⚠️';
    }

    return '•';
  }

  get text(): string {
    return this.status;
  }
}

