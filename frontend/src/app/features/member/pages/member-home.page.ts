import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MembresApiService } from '../../../core/api/membres-api.service';
import { MemberSessionService } from '../../../core/auth/member-session.service';
import { MembreResponse } from '../../../shared/models/membre.model';

@Component({
  selector: 'app-member-home-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  template: `
    <!-- Hero Banner Padel -->
    <section class="relative min-h-screen flex items-center justify-center bg-gradient-padel overflow-hidden pt-20 pb-12 px-4">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-20 left-10 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-court-300 rounded-full mix-blend-multiply filter blur-3xl" style="animation: pulse 4s 2s infinite;"></div>
      </div>

      <div class="relative z-10 w-full max-w-md">
        <!-- Main Card -->
        <div class="bg-white rounded-3xl shadow-padel-lg p-8 md:p-12 overflow-hidden">
          <!-- Top decoration bar -->
          <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-padel-600 via-padel-500 to-court-600"></div>

          <!-- Icon -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-padel-100 to-court-100 rounded-2xl">
              <span class="text-4xl animate-bounce-slow">🏓</span>
            </div>
          </div>

          <!-- Title & Subtitle -->
          <h2 class="text-3xl md:text-4xl font-black text-center text-padel-900 mb-2">
            Identification
          </h2>
          <p class="text-center text-slate-600 mb-8">
            Saisissez votre matricule pour rejoindre le court 🎾
          </p>

          <!-- Form -->
          <form [formGroup]="form" class="space-y-6" (ngSubmit)="submit()">
            <!-- Input field -->
            <div class="space-y-2">
              <label class="block text-sm font-bold text-slate-900">Votre Matricule</label>
              <input
                matInput
                formControlName="matricule"
                placeholder="Ex: G1234, S12345, L12345"
                class="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-padel-600 focus:outline-none focus:ring-4 focus:ring-padel-200 text-lg font-bold tracking-widest uppercase transition-all duration-300"
                style="letter-spacing:0.08em;"
              />
              @if (form.get('matricule')?.invalid && form.get('matricule')?.touched) {
                <p class="text-xs font-medium text-red-600">Format: G#####, S#####, ou L#####</p>
              }
            </div>

            <!-- Types Legend -->
            <div class="rounded-2xl bg-gradient-to-br from-padel-50 to-court-50 p-4 border-2 border-padel-100">
              <p class="text-xs font-bold text-slate-600 mb-3 uppercase tracking-wider">Types de Membres</p>
              <div class="space-y-2">
                <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                  <span class="text-xl">🌍</span>
                  <div class="text-xs">
                    <p class="font-bold text-slate-900">GLOBAL</p>
                    <p class="text-slate-600">G + 4 chiffres · Tous les sites</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                  <span class="text-xl">🏟️</span>
                  <div class="text-xs">
                    <p class="font-bold text-slate-900">SITE</p>
                    <p class="text-slate-600">S + 5 chiffres · Site dédié</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                  <span class="text-xl">⚡</span>
                  <div class="text-xs">
                    <p class="font-bold text-slate-900">LIBRE</p>
                    <p class="text-slate-600">L + 5 chiffres · Accès libre</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            @if (errorMessage()) {
              <div class="p-4 rounded-xl bg-red-50 border-2 border-red-200 flex items-center gap-3">
                <span class="text-2xl">❌</span>
                <p class="text-sm font-medium text-red-700">{{ errorMessage() }}</p>
              </div>
            }

            <!-- Found Member Preview -->
            @if (foundMember()) {
              <div class="p-4 rounded-xl bg-gradient-to-r from-padel-50 to-padel-100 border-2 border-padel-300 flex items-center gap-4">
                <span class="text-3xl animate-pulse">✅</span>
                <div class="flex-1">
                  <p class="font-bold text-padel-900">
                    {{ foundMember()!.prenom }} {{ foundMember()!.nom }}
                  </p>
                  <div class="flex items-center gap-2 mt-1 flex-wrap">
                    <span
                      class="inline-block px-3 py-1 rounded-full text-xs font-bold"
                      [class.bg-blue-100]="foundMember()!.typeMembre === 'GLOBAL'"
                      [class.text-blue-700]="foundMember()!.typeMembre === 'GLOBAL'"
                      [class.bg-green-100]="foundMember()!.typeMembre === 'SITE'"
                      [class.text-green-700]="foundMember()!.typeMembre === 'SITE'"
                      [class.bg-yellow-100]="foundMember()!.typeMembre === 'LIBRE'"
                      [class.text-yellow-700]="foundMember()!.typeMembre === 'LIBRE'"
                    >
                      {{ foundMember()!.typeMembre }}
                    </span>
                    <span class="text-xs text-slate-600">· {{ foundMember()!.siteNom || '🌍 Tous les sites' }}</span>
                  </div>
                </div>
              </div>
            }

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="form.invalid || loading()"
              class="w-full py-4 px-6 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-padel-600 to-padel-500 hover:shadow-padel-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              @if (loading()) {
                <div class="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                <span>Vérification...</span>
              } @else {
                <span>🎾 Accéder à mon espace</span>
              }
            </button>
          </form>

          <!-- Footer -->
          <div class="text-center mt-8 pt-6 border-t border-slate-200">
            <p class="text-xs text-slate-500 font-medium">
              Version Beta - Tous les matchs enregistrés sont en cour de traitement
            </p>
          </div>
        </div>
      </div>
    </section>

    <style>
      [matInput] {
        font-family: 'Courier New', monospace;
      }
    </style>
  `,
})
export class MemberHomePage {
  private readonly membresApi = inject(MembresApiService);
  private readonly memberSession = inject(MemberSessionService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly foundMember = signal<MembreResponse | null>(null);

  readonly form = new FormGroup({
    matricule: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^(G\d{4}|S\d{5}|L\d{5})$/i)],
    }),
  });

  constructor() {
    if (this.memberSession.isAuthenticated()) {
      this.router.navigateByUrl('/member/profile');
    }
  }

  submit(): void {
    if (this.form.invalid || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.foundMember.set(null);

    const matricule = this.form.controls.matricule.getRawValue().trim().toUpperCase();

    // ← Remplacer getByMatricule par login
    this.memberSession.login(matricule).subscribe({
      next: (member) => {
        this.foundMember.set(member);
        this.loading.set(false);
        setTimeout(() => this.router.navigateByUrl('/member/profile'), 600);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set(
          'Matricule introuvable. Vérifiez la valeur saisie (ex: G1001, S10001, L10001).',
        );
      },
    });
  }
}
