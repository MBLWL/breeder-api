module.exports = {
    mongoURI: 'mongodb+srv://breeder:GtmwECDdd3sL26N3@breederdb-vruiv.mongodb.net/breeder?retryWrites=true&w=majority'
      // mongoURI:'mongodb://localhost:27017/breeder_official'
    , //Server: 'https://breeder-api.herokuapp.com',
    // Server: 'http://localhost:3000',
    Server: 'https://breeder-api.herokuapp.com',
    // webServer: 'http://localhost:3000',
    webServer: 'https://breeder-dev.herokuapp.com',
    
    serverURL: 'https://breeder-api.herokuapp.com',
    imageURL: 'https://breeder-api.herokuapp.com/uploads/images/form/',
    mailthrough: 'admin@breeder.com',
    baseImageURL: 'https://breeder-api.herokuapp.com/uploads/images/',
    baseDocumentURL: 'https://breeder-api.herokuapp.com/uploads/documents/',
    sendgridAPIKey: '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',
    // sendgridAPIKey: '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',

    //stripe
    stripe_publishable:"pk_test_4UM0NJail2U84LTdxbWH90GH00BcqCrNYn",
    stripe_private:"sk_test_Cozb0IU8FFmiHpepGUVqQCUM00gNg0NJRk",
    
    //paypal
    paypalId:"",
    paypalSecret:"",
}