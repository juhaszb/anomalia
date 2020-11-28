/// <reference types="cypress" />
import {
	getButtonByLabel,
	getMatFormFieldByPlaceholder,
} from 'cypress/support/app.po';

const ValidUsername = 'Username10';
const ValidPassword = 'Pasd234dsf.';
describe('Register & Login', () => {
	it('Register with wrong credentials', () => {
		cy.visit('localhost:4200/public/register');
		const userName = getMatFormFieldByPlaceholder('Felhasználónév');
		userName.clear().type('Wrong');
		userName.should('have.value', 'Wrong');

		const password = getMatFormFieldByPlaceholder('Jelszó');
		password.clear().type('Wrong');
		password.should('have.value', 'Wrong');
		cy.get('mat-card-actions').within(() => {
			const registerButton = getButtonByLabel('Regisztráció');
			registerButton.click();
		});
		const validatedPassword = getMatFormFieldByPlaceholder(
			'Jelszó'
		).parentsUntil('mat-form-field');
		validatedPassword.within(() => {
			cy.get('div.mat-form-field-outline.mat-form-field-outline-thick').should(
				'have.css',
				'color',
				'rgb(244, 67, 54)'
			);
		});
	});
	it('Register with good credentials', () => {
		cy.visit('localhost:4200/public/register');
		const userName = getMatFormFieldByPlaceholder('Felhasználónév');
		userName.clear().type(ValidUsername);
		userName.should('have.value', ValidUsername);

		const password = getMatFormFieldByPlaceholder('Jelszó');
		password.clear().type(ValidPassword);
		password.should('have.value', ValidPassword);
		cy.get('mat-card-actions').within(() => {
			const registerButton = getButtonByLabel('Regisztráció');
			registerButton.click();
		});
		const validatedPassword = getMatFormFieldByPlaceholder(
			'Jelszó'
		).parentsUntil('mat-form-field');
		validatedPassword.within(() => {
			cy.get('div.mat-form-field-outline.mat-form-field-outline-thick').should(
				'not.have.css',
				'color',
				'rgb(244, 67, 54)'
			);
		});
		cy.get('.cdk-overlay-container').within(() => {
			cy.contains('Sikeres felvétel');
		});
		cy.contains('Bejelentkezés');
	});

	it('Login with wrong credentials', () => {
		cy.visit('localhost:4200/public/login');
		const userName = getMatFormFieldByPlaceholder('Felhasználónév');
		userName.clear().type('Wrong');
		userName.should('have.value', 'Wrong');

		const password = getMatFormFieldByPlaceholder('Jelszó');
		password.clear().type('Wrong');
		password.should('have.value', 'Wrong');
		cy.get('mat-card-actions').within(() => {
			const registerButton = getButtonByLabel('Bejelentkezés');
			registerButton.click();
		});
		cy.contains('Bejelentkezés');
	});
	it.only('Login with good credentials', () => {
		cy.visit('localhost:4200/public/login');
		const userName = getMatFormFieldByPlaceholder('Felhasználónév');
		userName.clear().type(ValidUsername);
		userName.should('have.value', ValidUsername);

		const password = getMatFormFieldByPlaceholder('Jelszó');
		password.clear().type(ValidPassword);
		password.should('have.value', ValidPassword);
		cy.get('mat-card-actions').within(() => {
			const registerButton = getButtonByLabel('Bejelentkezés');
			registerButton.click();
		});
		cy.contains('Kijelentkezés');
	});
});
