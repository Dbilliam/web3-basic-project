const { expect, assert, should } = require("chai");
const { ethers } = require("hardhat");

// expect style

foo = "mall",
companies = { name:['Google','Amazon','Coding Ninjas']};

// expect(foo).to.be.a('string');
// expect(foo).to.equal('mall');
// expect(foo).to.have.lenghtOf(4);
// expect(companies).to.have.property('name').with.lengthOf(3);


// Should => same as the expect style. However the diffenrence is that the should style extends each object
// with a should property to start the chain 

// foo.should.be.a('string');
// foo.should.equal('mall');
// foo.should.have.lenghtOf(4);
// companies.should.have.property('name').with.lenghtOf(3);


// Chai assert style provide the development with classic assert-do-notation similar to what is packaged with nodejs with provide serveral additional test and brower compatibility privileges;
// assert.typeOf(foo, 'string'); // this will not display /an optional message 
// assert.typeOf(foo,'string','foo is a string'); //this will display an optional message
// assert.equal(foo, 'mall','foo equal `mall`');
// assert.lengthOf(foo, 4, 'foo`s value has a lenght of 4');
// assert.lengthOf(companies.name,3,'companies has3 names');