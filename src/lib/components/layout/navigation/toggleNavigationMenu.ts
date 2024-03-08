import { showNavigationMenu } from './navigationMenuStore';

export function toggleNavigationMenu(value: boolean) {
  showNavigationMenu.set(value);
}
