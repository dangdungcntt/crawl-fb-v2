const axios = require('axios');
const _ = require('lodash');

const graphNext = async (graphData) => {
    const next = _.get(graphData, 'paging.next', undefined);
    if (next) {
        let response = await axios.get(graphData.paging.next);
        let resData = response.data;

        if (resData.error) {
            return graphData;
        }

        graphData.data = graphData.data.concat(resData.data);
        graphData.paging.next = _.get(resData, 'paging.next', undefined)
        return await graphNext(graphData);
    }

    return graphData;
}

const graphAll = async (url) => {
    try {
        let response = await axios.get(url);
        let resData = response.data;

        if (resData.error) {
            return {
                error: resData.error
            }
        }

        return await graphNext(resData);
    } catch (e) {
        return {
            error: e.toString()
        }
    }
}

module.exports = {
    graphAll
}
