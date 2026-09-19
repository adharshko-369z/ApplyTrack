function renderResponseRate(counts,total){
    if(!counts) return 0

    const filteredStatusCounts = Object.entries(counts)
                            .filter(([key]) => key !== "no-response")
                            .reduce((acc,current)=> acc+current[1], 0)

    const responseRate = (filteredStatusCounts / total)*100

    return Math.round(responseRate) || 0
  }

function renderProgressionRate(counts,total){

    if(!counts) return 0

    const filteredStatusCounts = Object.entries(counts)
                            .filter(([key]) => key !== "no-response" && key !== "rejected")
                            .reduce((acc,current)=> acc+current[1], 0)

    const responseRate = (filteredStatusCounts / total)*100

    return Math.round(responseRate) || 0

  }


export { renderResponseRate,renderProgressionRate }  