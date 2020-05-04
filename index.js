const exampleRequests = [
    {
        clientId: 1,
        requestId: 'abc',
        hours: 6
    },
    {
        clientId: 2,
        requestId: 'ghi',
        hours: 1
    },
    {
        clientId: 1,
        requestId: 'def',
        hours: 4
    },
    {
        clientId: 1,
        requestId: 'zzz',
        hours: 2
    }
]

function allocateAndReport() {
    //Initiallizing Result Object
    var result = {
        butlers: [],
        spreadClientIds: []
    };
    //Setting Max Hours per buttler
    const maxHoursPerButler = 8;

    //Filtering butlers on the time slots availability
    var butlersArr = [];
    exampleRequests.map((request, index) => {
        //If there is not initial butler avaialble push a new 
        if (butlersArr.length === 0) {
            var remainignHours = maxHoursPerButler - request.hours;
            butlersArr.push({
                totalHours: maxHoursPerButler,
                remainignHours: remainignHours,
                requests: [request.requestId]
            })
        }
        // If there is any butler already available 
        else {
            //Check if this butler has enough time to perform this job
            var avaialbleButler = butlersArr.filter((but) => but.remainignHours >= request.hours)
            // If yes
            if (avaialbleButler.length > 0) {
                var butler = avaialbleButler[0];
                butler.remainignHours = butler.remainignHours - request.hours;
                butler.requests.push(request.requestId)
            }
            // if butler is not having enough capacity, push a new butler
            else {
                var remainignHours = maxHoursPerButler - request.hours;
                butlersArr.push(
                    {
                        totalHours: maxHoursPerButler,
                        remainignHours: remainignHours,
                        requests: [request.requestId]
                    })
            }
        }
    })

    //Filtering Bulters as per required result   
    butlersArr.map((butler, index) => {
        result.butlers.push(butler.requests);
    })

    // Filtering unique client Ids
    result.spreadClientIds = exampleRequests.map(item => item.clientId)
        .filter((value, index, self) => self.indexOf(value) === index)

    console.log(result);
}

allocateAndReport();