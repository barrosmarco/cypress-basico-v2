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
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Marco')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('marco@yol,com')
        cy.get('#phone').type('11999999988')
        cy.get('#open-text-area').type("Teste")
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })


    it('campo de telefone só aceita números, crie um teste para validar que, se um valor não-numérico for digitado', function () {
        cy.get('#phone').type('abcdefghij')
        cy.get('.error').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Marco')
        cy.get('#lastName').type('Barros')
        cy.get('#email').type('marco@yol.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type("Teste")
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })


    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Marco')
            .should('have.value', 'Marco')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Barros')
            .should('have.value', 'Barros')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('marco@yol.com')
            .should('have.value', 'marco@yol.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('11999999988')
            .should('have.value', '11999999988')
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .type('Teste')
            .should('have.value', 'Teste')
            .clear()
            .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit('Marco Antonio', 'Barros', 'marco@uol.com.br', '11999999999', 'Texto Exato')
        cy.get('.success').should('be.visible')
    })

    //SEÇÃO 5
    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it(' seleciona um produto (Cursos) por seu índice', function () {
        cy.get('#product')
            .select(2)
            .should('have.value', 'cursos')
    })

    //SEÇÃO 6
    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })

    it('marca o checkbox "email"', function () {
        cy.get('input[type="checkbox"]')
            .check('email')
            .should('have.value', 'email')
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    //SEÇÃO 7
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    //SEÇÃO 8
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    //SEÇÃO 9

})