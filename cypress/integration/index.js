

describe("All Cases",()=>{
    const el =['Batman Begins',"Logan","Airplane Mode"];
   

    for(let i=0;i<el.length;i++)
    {
        


        it('Movie search with 1st result as '+el[i]+':',()=>{
            cy.visit('https://www.imdb.com/')
            .get('form[id="nav-search-form"]')
            .type(el[i])
            .submit()
            cy.get('body > div:nth-child(11) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)')
            .should('have.text',el[i])
            .click()
        });




        it("Movie renders correct Director name on Omdb",()=>{
            var str=""
            for(let j=0;j<el[i].length;j++)
            {
                if(el[i][j]!=' ')
                {
                    str+=(el[i][j]);
                }
                else{
                    str+='+';
                }
            }
            str  = str.toLowerCase();
            
            var dir =""
            var id = ""
            cy.request('http://www.omdbapi.com/?t='+str+'&apikey=59da03cd&')
            .its('body')
            .then((str)=>{
                dir = str.Director;
                id = str.imdbID;
                cy.visit('https://www.imdb.com/')
                .get('form[id="nav-search-form"]')
                .type(el[i])
                .submit()
                cy.get('body > div:nth-child(11) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)')
                .should('have.text',el[i])
                .click()
            cy.get('body > div:nth-child(2) > main:nth-child(6) > div:nth-child(1) > section:nth-child(4) > section:nth-child(1) > div:nth-child(4) > section:nth-child(1) > section:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)')
            .should('have.text',dir)
            cy.log("dir is"+dir)
            })
            cy.log(dir);
            
        });

        it("Correct release year",()=>
        {
            var str=""
            for(let j=0;j<el[i].length;j++)
            {
                if(el[i][j]!=' ')
                {
                    str+=(el[i][j]);
                }
                else{
                    str+='+';
                }
            }
            str  = str.toLowerCase();

            var dir =""
            var id = ""
            cy.request('http://www.omdbapi.com/?t='+str+'&apikey=59da03cd&')
            .its('body')
            .then((str)=>{
                dir = str.Year;
                id = str.imdbID;
                cy.visit('https://www.imdb.com/title/'+id+'/')
            cy.get('body > div:nth-child(2) > main:nth-child(6) > div:nth-child(1) > section:nth-child(4) > section:nth-child(1) > div:nth-child(4) > section:nth-child(1) > section:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > span:nth-child(2)')
            .should('have.text',dir)
        })
    });


        
        it("Correct writers List",()=>
        {
            var str=""
            for(let j=0;j<el[i].length;j++)
            {
                if(el[i][j]!=' ')
                {
                    str+=(el[i][j]);
                }
                else{
                    str+='+';
                }
            }
            str  = str.toLowerCase();

            var dir =""
            var id = ""
            cy.request('http://www.omdbapi.com/?t='+str+'&apikey=59da03cd&')
            .its('body')
            .then((str)=>{
                dir = str.Writer;
                id = str.imdbID;
                cy.visit('https://www.imdb.com/title/'+id+'/')
                
            cy.get('body > div:nth-child(2) > main:nth-child(6) > div:nth-child(1) > section:nth-child(4) > section:nth-child(1) > div:nth-child(4) > section:nth-child(1) > section:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2) > div:nth-child(2)')
            .should('have.text',dir)
        })
    });

    
    it("Correct genre List",()=>
    {
        var str=""
        for(let j=0;j<el[i].length;j++)
        {
            if(el[i][j]!=' ')
            {
                str+=(el[i][j]);
            }
            else{
                str+='+';
            }
        }
        str  = str.toLowerCase();

        var dir =""
        var id = ""
        cy.request('http://www.omdbapi.com/?t='+str+'&apikey=59da03cd&')
        .its('body')
        .then((str)=>{
            dir = str.Genre;
            id = str.imdbID;
            cy.visit('https://www.imdb.com/title/'+id+'/')
            
        cy.get('body > div:nth-child(2) > main:nth-child(6) > div:nth-child(1) > section:nth-child(4) > div:nth-child(2) > section:nth-child(1) > div:nth-child(1) > div:nth-child(1) > section:nth-child(9) > div:nth-child(2) > ul:nth-child(4) > li:nth-child(2) > div:nth-child(2)')
        .should('have.text',dir)
    })
});


it("Correct Maturity Rating",()=>
{
    var str=""
    for(let j=0;j<el[i].length;j++)
    {
        if(el[i][j]!=' ')
        {
            str+=(el[i][j]);
        }
        else{
            str+='+';
        }
    }
    str  = str.toLowerCase();

    var dir =""
    var id = ""
    cy.request('http://www.omdbapi.com/?t='+str+'&apikey=59da03cd&')
    .its('body')
    .then((str)=>{
        dir = str.Rated;
        id = str.imdbID;
        cy.visit('https://www.imdb.com/title/'+id+'/')
        
    cy.get('[class="sc-8c396aa2-2 itZqyK"]:last')
    .should('have.text',dir)
})
});

it("Correct Rating",()=>
{
    var str=""
    for(let j=0;j<el[i].length;j++)
    {
        if(el[i][j]!=' ')
        {
            str+=(el[i][j]);
        }
        else{
            str+='+';
        }
    }
    str  = str.toLowerCase();

    var dir =""
    var id = ""
    cy.request('http://www.omdbapi.com/?t='+str+'&apikey=59da03cd&')
    .its('body')
    .then((str)=>{
        dir = str.imdbRating;
        id = str.imdbID;
        cy.visit('https://www.imdb.com/title/'+id+'/')
        
    cy.get('[class="sc-7ab21ed2-1 jGRxWM"]:last')
    .should('have.text',dir)
})
});







    }
});

