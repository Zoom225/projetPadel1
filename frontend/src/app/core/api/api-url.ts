import { environment } from '../../../environnements/environment';

export const apiUrl = (path: string): string => `${environment.apiBaseUrl}${path}`;
