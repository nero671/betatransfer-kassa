import SlDrawer from "@shoelace-style/shoelace/dist/components/drawer/drawer.js";

class AppHeader extends HTMLElement {
	static selectors = {
		header: '.header',
		menuButton: '[data-menu-drawer-toggle]',
		menuDrawer: '[data-menu-drawer]',
	}

	static classes = {
		sticky: 'header--sticky',
		drawerOpened: 'header--drawer-opened'
	}

	connectedCallback() {
		this.header = this.querySelector(AppHeader.selectors.header);
		
		this.addEventListener('sl-request-close', this.closeDrawer.bind(this));
		this.addEventListener('click', this.toggleMenu.bind(this));
			
		if (this.header) {
			this.observer = new IntersectionObserver((entries) => {
				const target = entries[0];
				
				this.header.classList.toggle(AppHeader.classes.sticky, !target.isIntersecting);
			});

			this.observer.observe(this);
		}
	}

	disconnectedCallback() {
		this.removeEventListener('sl-request-close', this.closeDrawer.bind(this));
		this.removeEventListener('click', this.toggleMenu.bind(this));

		if (this.observer) {
			this.observer.unobserve(this);
		}
	}

	toggleMenu({ target }) {
		if (!target.matches(AppHeader.selectors.menuButton)) return;

		const drawer = Array.from(
			this.querySelectorAll(AppHeader.selectors.menuDrawer)
		).find(item => item.dataset.menuDrawer === target.dataset.menuDrawerToggle);

		if (!drawer) return;

		if (drawer.open) {
			drawer.hide();
		} else {
			drawer.show();
		}

		this.toggleExpandedState(target, drawer);
	}

	closeDrawer(event) {
		const target = event.target;

		if(!target instanceof SlDrawer) return;

		event.preventDefault();

		if (!target.matches(AppHeader.selectors.menuDrawer)) return;

		const button = Array.from(
			this.querySelectorAll(AppHeader.selectors.menuButton)
		).find(item => item.dataset.menuDrawerToggle === target.dataset.menuDrawer);

		if (!button) return; 
		
		target.hide();
		this.toggleExpandedState(button, target)
	}

	toggleExpandedState(menuButton, menuDrawer) {
		menuButton.setAttribute('aria-expanded', menuDrawer.open);
		this.header.classList.toggle(AppHeader.classes.drawerOpened, menuDrawer.open);
	}
}

customElements.define('app-header', AppHeader);