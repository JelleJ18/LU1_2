describe('Video Store App', () => {
  // 1. Zoekproces: zoeken op titel
  it('kan zoeken op titel', () => {
    cy.visit('/films');
    cy.get('input[name=search]').type('ACADEMY');
    cy.get('form').submit();
    cy.contains('ACADEMY').should('exist');
  });

  // 2. Zoekproces: filteren op genre
  it('kan filteren op genre', () => {
    cy.visit('/films');
    cy.get('select[name=genre]').select(1); // selecteer het eerste genre (pas aan indien nodig)
    cy.get('form').submit();
    cy.get('.card-title').should('exist');
  });

  // 3. Film informatie: detailpagina toont metadata en acteurs
  it('laat metadata en acteurs zien op detailpagina', () => {
    cy.visit('/films/details');
    cy.get('.card-title').first().click();
    cy.get('.card-title').should('exist');
    cy.contains('Description:').should('exist');
    cy.contains('Actors').should('exist');
  });

  // 4. Accountbeheer: registratie
  it('kan een account aanmaken', () => {
    cy.visit('/users/register');
    cy.get('input[name=firstName]').type('Test');
    cy.get('input[name=lastName]').type('Gebruiker');
    cy.get('input[name=email]').type('test' + Date.now() + '@mail.com');
    cy.get('input[name=password]').type('test1234');
    cy.get('form').submit();
    cy.url().should('include', '/auth/login');
  });

  // 5. Accountbeheer: inloggen
  it('geeft foutmelding bij verkeerde login', () => {
    cy.visit('/auth/login');
    cy.get('input[name=email]').type('nietbestaand@email.com');
    cy.get('input[name=password]').type('foutwachtwoord');
    cy.get('form').submit();
    cy.contains('Wrong email or password!').should('be.visible');
  });

  // 6. Accountbeheer: inloggen en accountpagina bekijken
  it('kan inloggen en accountpagina bekijken', () => {
    // Gebruik een bestaand account!
    cy.visit('/auth/login');
    cy.get('input[name=email]').type('jellejankowski8@gmail.com'); 
    cy.get('input[name=password]').type('secret'); 
    cy.get('form').submit();
    cy.url().should('include', '/users/account');
    cy.contains('My Account').should('exist');
  });

  // 7. Accountbeheer: gehuurde films bekijken
  it('kan gehuurde films bekijken', () => {
    // Eerst inloggen
    cy.visit('/auth/login');
    cy.get('input[name=email]').type('jellejankowski8@gmail.com'); // pas aan naar bestaand account
    cy.get('input[name=password]').type('secret'); // pas aan naar bestaand account
    cy.get('form').submit();
    cy.visit('/users/rentals');
    cy.contains('My Rentals').should('exist');
  });

  // 8. Accountbeheer: uitloggen
  it('kan uitloggen', () => {
    // Eerst inloggen
    cy.visit('/auth/login');
    cy.get('input[name=email]').type('jellejankowski8@gmail.com'); // pas aan naar bestaand account
    cy.get('input[name=password]').type('secret'); // pas aan naar bestaand account
    cy.get('form').submit();
    cy.get('a.nav-link').contains('Logout').click();
    cy.url().should('include', '/auth/login');
  });
});