class AppContactFormModal extends HTMLElement {
	static selectors = {
		button: '[data-modal="contact"]',
		modal: 'sl-dialog',
		close: '[data-modal-close]'
	}

	connectedCallback() {
		this.buttons = document.querySelectorAll(AppContactFormModal.selectors.button);
		this.modal = this.querySelector(AppContactFormModal.selectors.modal);

		if (!this.modal && this.buttons.length === 0) return;

		this.buttons.forEach(button => button.addEventListener('click', this.toggleModal.bind(this)));
		this.modal.addEventListener('click', this.toggleModal.bind(this));
	}

	toggleModal(event) {
		const target = event.target;
	
		if (!target.matches(`${AppContactFormModal.selectors.close}, ${AppContactFormModal.selectors.button}`)) return;

		if (this.modal.open) {
			this.modal.hide();
		} else {
			this.modal.show();
		}
	}
}

customElements.define('app-contact-form-modal', AppContactFormModal);