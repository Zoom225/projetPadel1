// Fichier: src/app/shared/components/match-card.component.ts
// Composant réutilisable pour afficher les cartes de matchs

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchResponse } from '../models/match.model';

@Component({
  selector: 'app-match-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="match-card" [class.match-card-full]="isFull()">
      <!-- Statut badge -->
      <div class="match-card-badge" [class]="statusBadgeClass()">
        {{ match.typeMatch }}
      </div>

      <!-- Contenu principal -->
      <div class="match-card-content">
        <!-- En-tête -->
        <div class="match-card-header">
          <h3 class="match-card-title">🎾 {{ match.terrainNom }}</h3>
          <span class="match-card-id">#{{ match.id }}</span>
        </div>

        <!-- Infos -->
        <div class="match-card-info">
          <div class="match-info-item">
            <span class="match-info-label">📍 Site</span>
            <span class="match-info-value">{{ match.siteNom }}</span>
          </div>
          <div class="match-info-item">
            <span class="match-info-label">📅 Date</span>
            <span class="match-info-value">{{ match.date }}</span>
          </div>
          <div class="match-info-item">
            <span class="match-info-label">🕐 Heure</span>
            <span class="match-info-value">{{ match.heureDebut }} - {{ match.heureFin }}</span>
          </div>
        </div>

        <!-- Joueurs -->
        <div class="match-card-players">
          <span class="match-info-label">👥 Joueurs</span>
          <div class="match-players-status">
            <span class="match-player-count">{{ currentPlayers }} / 4 joueurs</span>
            <div class="match-progress-bar">
              <div class="match-progress-fill" [style.width.%]="playerPercentage"></div>
            </div>
          </div>
        </div>

        <!-- Price -->
        <div class="match-card-price">
          💰 {{ match.prixParJoueur }} EUR
          <span class="match-price-per">(Par joueur)</span>
        </div>

        <!-- Organisateur -->
        <div class="match-card-organizer">
          <span class="match-organizer-icon">👤</span>
          <span class="match-organizer-name">{{ match.organisateurNom }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .match-card {
      @apply rounded-2xl bg-white border-2 border-slate-200 p-5 shadow-sm hover:shadow-padel hover:-translate-y-1 transition-all duration-300 cursor-pointer;
      background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.95));
      position: relative;
      overflow: hidden;
    }

    .match-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(to right, #16a34a, #0ea5e9);
    }

    .match-card-full {
      @apply border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50;
    }

    .match-card-badge {
      @apply absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold;
      background: #16a34a;
      color: white;
    }

    .match-card-badge.private {
      @apply bg-purple-600;
    }

    .match-card-content {
      @apply space-y-4;
    }

    .match-card-header {
      @apply flex items-start justify-between gap-2;
    }

    .match-card-title {
      @apply text-lg font-bold text-slate-900 m-0;
    }

    .match-card-id {
      @apply text-xs font-semibold text-slate-500 uppercase tracking-wider;
    }

    .match-card-info {
      @apply grid grid-cols-3 gap-3 pt-2 border-t border-slate-200;
    }

    .match-info-item {
      @apply space-y-1;
    }

    .match-info-label {
      @apply text-xs font-semibold text-slate-600 uppercase tracking-wide;
    }

    .match-info-value {
      @apply block text-sm font-bold text-slate-900;
    }

    .match-card-players {
      @apply space-y-2;
    }

    .match-players-status {
      @apply flex items-center gap-3;
    }

    .match-player-count {
      @apply text-sm font-bold text-slate-900 min-w-fit;
    }

    .match-progress-bar {
      @apply flex-1 h-2 bg-slate-200 rounded-full overflow-hidden;
    }

    .match-progress-fill {
      @apply h-full bg-gradient-to-r from-padel-600 to-court-600 transition-all duration-300;
    }

    .match-card-price {
      @apply text-center font-bold text-lg text-padel-700 py-2 bg-padel-50 rounded-lg;
    }

    .match-price-per {
      @apply block text-xs text-slate-600 font-normal;
    }

    .match-card-organizer {
      @apply flex items-center gap-2 pt-2 border-t border-slate-200;
    }

    .match-organizer-icon {
      @apply text-base;
    }

    .match-organizer-name {
      @apply text-sm font-semibold text-slate-700;
    }
  `]
})
export class MatchCardComponent {
  @Input() match!: MatchResponse;

  get currentPlayers(): number {
    return this.match.nbJoueursActuels ?? 0;
  }

  get playerPercentage(): number {
    return Math.min(100, (this.currentPlayers / 4) * 100);
  }

  isFull(): boolean {
    return this.currentPlayers >= 4;
  }

  statusBadgeClass(): string {
    return this.match.typeMatch === 'PRIVE' ? 'private' : '';
  }
}

