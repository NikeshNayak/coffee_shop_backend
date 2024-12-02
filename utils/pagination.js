const paginatedResults = (pageNumber, perPageValue, defaultSortField) => {
    const page = pageNumber > 0 ? parseInt(pageNumber) : 1;
    const perPage = perPageValue > 0 ? parseInt(perPageValue) : 10;
    let sortObj = {
        [defaultSortField]: -1,
    };
    return { page, skipRecord: (page - 1) * perPage, perPage, sortObj };
};

module.exports = { paginatedResults };
