describe('Video Store App', () => {
  // 1. zoeken op titel
  it('kan zoeken op titel', () => {
    cy.visit('/films');
    cy.get('input[name=search]').type('ACADEMY');
    cy.get('form').submit();
    cy.contains('ACADEMY').should('exist');
  });

  it('kan filteren op genre', () => {
    cy.visit('/films');
    cy.get('select[name=genre]').select(1);
    cy.get('form').submit();
    cy.get('.card-title').should('exist');
  });

  // 3. registratie
  it('kan een account aanmaken', () => {
    cy.visit('/users/register');
    cy.get('input[name=firstName]').type('Test');
    cy.get('input[name=lastName]').type('Gebruiker');
    cy.get('input[name=email]').type('test' + Date.now() + '@mail.com');
    cy.get('input[name=password]').type('test1234');
    cy.get('form').submit();
    cy.url().should('include', '/auth/login');
  });

  // 4. inloggen
  it('geeft foutmelding bij verkeerde login', () => {
    cy.visit('/auth/login');
    cy.get('input[name=email]').type('nietbestaand@email.com');
    cy.get('input[name=password]').type('foutwachtwoord');
    cy.get('form').submit();
    cy.contains('Wrong email or password!').should('be.visible');
  });

  // 5. inloggen en accountpagina bekijken
  it('kan inloggen en accountpagina bekijken', () => {
    cy.visit('/auth/login');
    cy.get('input[name=email]').type('jellejankowski8@gmail.com'); 
    cy.get('input[name=password]').type('secret'); 
    cy.get('form').submit();
    cy.url().should('include', '/users/account');
    cy.contains('My Account').should('exist');
  });

  // 6. gehuurde films bekijken
  it('kan gehuurde films bekijken', () => {
    cy.visit('/auth/login');
    cy.get('input[name=email]').type('jellejankowski8@gmail.com'); 
    cy.get('input[name=password]').type('secret'); 
    cy.get('form').submit();
    cy.visit('/users/rentals');
    cy.contains('My Rentals').should('exist');
  });

  // 7. uitloggen
  it('kan uitloggen', () => {
    cy.visit('/auth/login');
    cy.get('input[name=email]').type('jellejankowski8@gmail.com'); 
    cy.get('input[name=password]').type('secret'); 
    cy.get('form').submit();
    cy.url().should('include', '/users/account');

    cy.get('a.nav-link').contains('Logout').click();
    cy.url().should('include', '/auth/login');
  });
});