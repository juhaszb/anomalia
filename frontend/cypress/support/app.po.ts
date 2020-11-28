export const getMatFormFieldByPlaceholder = (placeholder: string) => {
	return cy
		.get('mat-label')
		.contains(placeholder)
		.parentsUntil('mat-form-field')
		.within(() => {
			return cy.get('input');
		});
};

export const getButtonByLabel = (label: string) => cy.contains(label);
