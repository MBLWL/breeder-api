module.exports = {
    mongoURI: 'mongodb+srv://breeder:GtmwECDdd3sL26N3@breederdb-vruiv.mongodb.net/breeder?retryWrites=true&w=majority'
      // mongoURI:'mongodb://localhost:27017/breeder_official'
    , //Server: 'http://localhost:5000',
    // Server: 'http://localhost:3000',
    Server: 'https://breeder-api.herokuapp.com',
    serverURL: 'http://localhost:5000',
    imageURL: 'http://localhost:5000/uploads/images/form/',
    mailthrough: 'admin@breeder.com',
    baseImageURL: 'http://localhost:5000/uploads/images/',

    //stripe
    stripe_publishable:"pk_test_4UM0NJail2U84LTdxbWH90GH00BcqCrNYn",
    stripe_private:"sk_test_Cozb0IU8FFmiHpepGUVqQCUM00gNg0NJRk",
    
    //paypal
    paypalId:"",
    paypalSecret:"",
}