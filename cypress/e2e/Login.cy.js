describe('Login Form Testleri', () => {
    beforeEach(() => {
      
      cy.visit('http://localhost:5173');
    });
  
    it('Başarılı form doldurulduğunda submit edip success sayfasına geçebilmeli', () => {
      
      cy.get('input[name="email"]').type('mert@example.com');
      cy.get('input[name="password"]').type('Mert123!');
      cy.get('input[name="terms"]').check();
  
      
      cy.get('button').should('not.be.disabled').click();
  
     
      cy.url().should('include', '/Success');
    });
  
    describe('Hata Senaryoları', () => {
      it('Email yanlış girildiğinde hata mesajı görünmeli ve buton disabled kalmalı', () => {
        cy.get('input[name="email"]').type('yanlis-email');
        cy.get('input[name="password"]').type('Mert123!');
        cy.get('input[name="terms"]').check();
  
        
        cy.get('.invalid-feedback').should('have.length', 1);
        cy.get('.invalid-feedback').should('contain', 'Geçerli bir email adresi giriniz.');
        
     
        cy.get('button').should('be.disabled');
      });
  
      it('Email ve Password yanlış girildiğinde 2 hata mesajı görünmeli', () => {
        cy.get('input[name="email"]').type('gecersiz@');
        cy.get('input[name="password"]').type('123'); // Şifre kısa
        
       
        cy.get('.invalid-feedback').should('have.length', 2);
        cy.get('.invalid-feedback').last().should('contain', 'Şifre en az 8 karakter olmalı');
        
      
        cy.get('button').should('be.disabled');
      });
  
      it('Email ve Password doğru ama kurallar kabul edilmediğinde buton disabled kalmalı', () => {
        cy.get('input[name="email"]').type('mert@example.com');
        cy.get('input[name="password"]').type('Mert123!');
        
        
        
        
        cy.get('button').should('be.disabled');
      });
    });
  });