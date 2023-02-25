///<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        // cy.get('')
        //     .should('be.visible')
        //     .type('Olá mundo')
        //     .should('have.value', 'Olá Mundo')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = "Teste, teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste,teste, teste"
        cy.get('#firstName').type('Marco')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('marco@yol.com')
        cy.get('#phone').type('11999999988')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Marco')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('marco@yol,com')
        cy.get('#phone').type('11999999988')
        cy.get('#open-text-area').type("Teste")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })


    it('campo de telefone só aceita números, crie um teste para validar que, se um valor não-numérico for digitado', function () {
        cy.get('#phone').type('abcdefghij')
        cy.get('.error').should('have.value', '')
    })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Marco')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('marco@yol.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type("Teste")
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })


})