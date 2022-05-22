describe("All Cases", () => {


    // movie names in an array
    const el = ['Batman Begins', "Logan", "Airplane Mode"];


    // looping through each movie in array el and carrying out each test 
    for (let i = 0; i < el.length; i++) {

        it('Movie search with 1st result as ' + el[i] + ':', () => {
            cy.visit('https://www.imdb.com/')
                .get('form[id="nav-search-form"]')
                .type(el[i])
                .submit()
            cy.get('body > div:nth-child(11) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)')
                .should('have.text', el[i])
                .click()
        });

        it("Correct Director name for movie " + el[i], () => {
            var str = ""
            str = el[i].split(" ");
            str = str.join("+");
            str = str.toLowerCase();

            var dir = ""
            var id = ""
            cy.request('http://www.omdbapi.com/?t=' + str + '&apikey=59da03cd&')
                .its('body')
                .then((str) => {
                    dir = str.Director;
                    id = str.imdbID;
                    cy.visit('https://www.imdb.com/')
                        .get('form[id="nav-search-form"]')
                        .type(el[i])
                        .submit()
                    cy.get('body > div:nth-child(11) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)')
                        .should('have.text', el[i])
                        .click()
                    cy.get('body > div:nth-child(2) > main:nth-child(6) > div:nth-child(1) > section:nth-child(4) > section:nth-child(1) > div:nth-child(4) > section:nth-child(1) > section:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)')
                        .should('have.text', dir)
                    cy.log("dir is" + dir)
                })
            cy.log(dir);

        });

        it("Correct release year for " + el[i], () => {
            var str = ""
            str = el[i].split(" ");
            str = str.join("+");
            str = str.toLowerCase();

            var dir = ""
            var id = ""
            cy.request('http://www.omdbapi.com/?t=' + str + '&apikey=59da03cd&')
                .its('body')
                .then((str) => {
                    dir = str.Year;
                    id = str.imdbID;
                    cy.visit('https://www.imdb.com/title/' + id + '/')
                    cy.get('body > div:nth-child(2) > main:nth-child(6) > div:nth-child(1) > section:nth-child(4) > section:nth-child(1) > div:nth-child(4) > section:nth-child(1) > section:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2)')
                        .should('have.text', dir)
                })
        });



        it("Correct writers List for " + el[i], () => {
            var str = ""
            str = el[i].split(" ");
            str = str.join("+");
            str = str.toLowerCase();

            var dir = [];
            var id = "";
            var writerArray = [];

            cy.request('http://www.omdbapi.com/?t=' + str + '&apikey=59da03cd&')
                .its('body')
                .then((str2) => {
                    dir = str2.Writer.split(",");
                    for (let i = 0; i < dir.length; i++) {
                        dir[i] = dir[i].trim();
                    }
                    id = str2.imdbID;
                    cy.visit('https://www.imdb.com/title/' + id + '/')
                        .get('[data-testid="title-pc-wide-screen"] > .ipc-metadata-list > :nth-child(2) > .ipc-metadata-list-item__content-container > ul > li')
                        .each((name) => {
                            var name2 = name.text();
                            var nameAct = "";
                            for (let i1 = 0; i1 < name2.length; i1++) {
                                if (name2[i1] != '(') {
                                    nameAct += (name2[i1]);
                                }
                                else {
                                    break;
                                }

                            }
                            writerArray.push(nameAct)
                        })
                        .log(writerArray)
                        .log(dir)
                        .then(() => {
                            dir.sort()
                            writerArray.sort()
                            var comp1 = JSON.stringify(dir);
                            var comp2 = JSON.stringify(writerArray);
                            expect(comp1).to.equal(comp2);

                        })
                })

        });


        it("Correct genre List for " + el[i], () => {
            var str = ""
            str = el[i].split(" ");
            str = str.join("+");
            str = str.toLowerCase();

            var dir = []
            var id = ""
            var genreImdb = []
            cy.request('http://www.omdbapi.com/?t=' + str + '&apikey=59da03cd&')
                .its('body')
                .then((str) => {
                    dir = str.Genre.split(",");
                    for (let i = 0; i < dir.length; i++) {
                        dir[i] = dir[i].trim();
                    }
                    id = str.imdbID;
                    cy.visit('https://www.imdb.com/title/' + id + '/')

                    cy.get('[data-testid="storyline-genres"] > .ipc-metadata-list-item__content-container>ul>li')
                        .each((genre) => {
                            var txt = genre.text();
                            genreImdb.push(txt);
                        })
                        .then(() => {
                            genreImdb.sort();
                            dir.sort()
                            var comp1 = JSON.stringify(dir);
                            var comp2 = JSON.stringify(genreImdb);
                            expect(comp1).to.equal(comp2);
                        })

                })
        });


        it("Correct Rated for " + el[i], () => {
            var str = ""
            str = el[i].split(" ");
            str = str.join("+");
            str = str.toLowerCase();
            var dir = ""
            var id = ""
            cy.request('http://www.omdbapi.com/?t=' + str + '&apikey=59da03cd&')
                .its('body')
                .then((str) => {
                    dir = str.Rated;
                    id = str.imdbID;
                    cy.visit('https://www.imdb.com/title/' + id + '/')

                    cy.get('[class="sc-8c396aa2-2 itZqyK"]:last')
                        .should('have.text', dir)
                })
        });

        it("Correct Maturity Rating for " + el[i], () => {
            var str = ""
            str = el[i].split(" ");
            str = str.join("+");
            str = str.toLowerCase();

            var dir = ""
            var id = ""
            cy.request('http://www.omdbapi.com/?t=' + str + '&apikey=59da03cd&')
                .its('body')
                .then((str) => {
                    dir = str.imdbRating;
                    id = str.imdbID;
                    cy.visit('https://www.imdb.com/title/' + id + '/')

                    cy.get('[class="sc-7ab21ed2-1 jGRxWM"]:last')
                        .should('have.text', dir)
                })
        });
    }
});

