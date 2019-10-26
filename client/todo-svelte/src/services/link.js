import page from 'page';

export function link(event) {
  event.preventDefault();
  page(event.currentTarget.getAttribute('href'));
}
