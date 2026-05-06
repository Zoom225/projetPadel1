import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AdminSessionService } from './core/auth/admin-session.service';
import { MemberSessionService } from './core/auth/member-session.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <!-- Header Principal -->
    <header class="sticky top-0 z-40 w-full bg-gradient-to-r from-padel-700 via-court-700 to-padel-700 shadow-lg backdrop-blur-sm border-b border-white/10">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between flex-wrap gap-2">

          <!-- Logo -->
          <a routerLink="/" class="inline-flex items-center gap-2 flex-shrink-0 group">
            <div class="relative inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg group-hover:bg-white/30 transition-all duration-200">
              <span class="text-2xl group-hover:animate-bounce">🎾</span>
            </div>
            <span class="text-xl font-black text-white tracking-tight hidden sm:inline">PadelPlay</span>
          </a>

          <!-- Navigation Principale -->
          <nav class="flex items-center gap-1 justify-center flex-1">
            <a routerLink="/" routerLinkActive="nav-active" [routerLinkActiveOptions]="{ exact: true }"
               class="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
              Accueil
            </a>

            @if (!adminSession.isAuthenticated()) {
              <a routerLink="/admin/login" class="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                Admin
              </a>
            }

            @if (!memberSession.isAuthenticated()) {
              <a routerLink="/member" class="px-4 py-1.5 text-sm font-semibold text-white border-2 border-white/50 hover:border-white hover:bg-white/10 rounded-full transition-all duration-200">
                👤 Espace membre
              </a>
            }

            @if (memberSession.isAuthenticated()) {
              <span class="w-1 h-6 bg-white/20 mx-1"></span>
              <a routerLink="/member/profile" routerLinkActive="nav-active"
                 class="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                👤 Profil
              </a>
              <a routerLink="/member/matches" routerLinkActive="nav-active"
                 class="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                🎾 Matchs
              </a>
              <a routerLink="/member/reservations" routerLinkActive="nav-active"
                 class="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                📅 Réservations
              </a>
              <a routerLink="/member/payments" routerLinkActive="nav-active"
                 class="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                💰 Paiements
              </a>

              <span class="w-1 h-6 bg-white/20 mx-1"></span>

              <a routerLink="/member/matches/new" class="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg rounded-full transition-all duration-200 hover:scale-105">
                ➕ Match
              </a>
              <a routerLink="/member/matches/new" [queryParams]="{type:'PUBLIC'}"
                 class="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-padel-500 to-padel-600 hover:shadow-padel rounded-full transition-all duration-200 hover:scale-105">
                🎾 PUBLIC
              </a>
              <a routerLink="/member/matches/new" [queryParams]="{type:'PRIVE'}"
                 class="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:shadow-lg rounded-full transition-all duration-200 hover:scale-105">
                🔒 PRIVÉ
              </a>

              <span class="w-1 h-6 bg-white/20 mx-1"></span>

              <button (click)="logoutMember()" type="button"
                      class="px-4 py-1.5 text-xs font-semibold text-red-200 border-2 border-red-400/50 hover:border-red-400 hover:bg-red-500/20 rounded-full transition-all duration-200">
                🚪 Déco
              </button>
            }

            @if (adminSession.isAuthenticated()) {
              <span class="w-1 h-6 bg-white/20 mx-1"></span>
              <a routerLink="/admin" routerLinkActive="nav-active" [routerLinkActiveOptions]="{ exact: true }"
                 class="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                📊 Dashboard
              </a>
              <a routerLink="/admin/members" routerLinkActive="nav-active"
                 class="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                👥 Membres
              </a>
              <a routerLink="/admin/matches" routerLinkActive="nav-active"
                 class="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                🎾 Matchs
              </a>
              <a routerLink="/admin/sites" routerLinkActive="nav-active"
                 class="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                🏢 Sites
              </a>
              <a routerLink="/admin/terrains" routerLinkActive="nav-active"
                 class="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                📍 Terrains
              </a>
              <a routerLink="/admin/fermetures" routerLinkActive="nav-active"
                 class="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                🔒 Fermetures
              </a>

              <span class="w-1 h-6 bg-white/20 mx-1"></span>

              <button (click)="logoutAdmin()" type="button"
                      class="px-4 py-1.5 text-xs font-semibold text-red-200 border-2 border-red-400/50 hover:border-red-400 hover:bg-red-500/20 rounded-full transition-all duration-200">
                🚪 Déco
              </button>
            }
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="min-h-[calc(100vh-64px)] pb-10 bg-gradient-to-b from-slate-50 via-blue-50 to-slate-50">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    .nav-active {
      @apply text-white !important;
      @apply bg-white/20 !important;
      @apply font-bold !important;
    }
  `]
})
export class App {
  readonly adminSession = inject(AdminSessionService);
  readonly memberSession = inject(MemberSessionService);
  private readonly router = inject(Router);

  logoutAdmin(): void {
    this.adminSession.clearSession();
    this.router.navigateByUrl('/admin/login');
  }

  logoutMember(): void {
    this.memberSession.clearMember();
    this.router.navigateByUrl('/member');
  }
}
