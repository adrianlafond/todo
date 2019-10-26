<style>
.app-header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 48px;
  margin: 0;
  background-color: var(--header-bg-color);
  color: var(--header-fg-color);
}

.app-header__title-link {
  position: absolute;
  left: 0;
  top: 0;
  margin: 0 0 0 16px;
  line-height: 48px;
  max-width: 75%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.app-header__title-link:visited {
  color: var(--header-fg-color);
}
.app-header__title-link--active {
  /* */
}
.app-header__title-text {
  margin: 0 16px;
  font-size: 24px;
  font-weight: normal;
  display: inline-block;
}
.app-header__title-icon {
  font-size: 24px;
  color: var(--header-fg-color);
}
.app-header__title-icon--active {
  color: var(--active-color);
}
.app-header__title-icon {
  font-size: 24px;
}

.app-header__menu {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 48px;
  margin: 0 16px;
  display: flex;
  align-items: center;
}

.app-header__link,
.app-header__link:visited {
  color: var(--header-fg-color);
}

.app-header__menu-link--active {
  color: var(--active-color) !important;
  cursor: default;
}

.app-header__icon-link {
  font-size: 24px;
  line-height: 48px;
}
</style>

<script>
  export let title = 'title';

  function onClick(event) {
    event.preventDefault();
    console.log(event.currentTarget.getAttribute('href'));
  }
</script>

<div class="app-header">
  <a
    href='/todos'
    on:click={onClick}
    routerLinkActive="app-header__title-link--active"
    class="app-header__link app-header__title-link">
    <i class="material-icons app-header__title-icon" routerLinkActive="app-header__title-icon--active">home</i>
    <h1 class="app-header__title-text">{ title }</h1>
  </a>
  <div class="app-header__menu">
    <a
      href="/preferences"
      on:click={onClick}
      routerLinkActive="app-header__menu-link--active"
      title="Preferences"
      class="app-header__link app-header__menu-link">
      <i class="material-icons app-header__icon-link">settings_applications</i>
    </a>
  </div>
</div>
