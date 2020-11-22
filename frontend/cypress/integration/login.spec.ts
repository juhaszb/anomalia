it('should update preview command in the terminal area based on the selected button', () => {
	cy.visit('/');

	// click the `Add PWA Support` button
	cy.get(':nth-child(8) > :nth-child(3)').click();

	// verify that the text in the terminal area is updated
	cy.get('.terminal').should('contain.text', 'ng add @angular/pwa');
});
