/**
 * get the number of pages
 * @param  {[type]} n        total number of rows
 * @param  {[type]} nPerPage number of rows per page
 * @return {[type]}          number of pages
 */
const getNPage = (n, nPerPage) => {
    return Math.ceil(n / nPerPage);
};
const getPagination = (n, nPerPageIn) => {
    const nPerPage = nPerPageIn || 10;
    const nPage = getNPage(n, nPerPage);
    const idx = 1;
    return {
        idx,
        nPerPage,
        nPage
    };
};
const paginationBoundaries = (idx, nPerPage) => {
    const start = (idx - 1) * nPerPage;
    const end = idx * nPerPage;
    return { start, end };
};
const withPagination = (data, idx, nPerPage) => {
    const { start, end } = paginationBoundaries(idx, nPerPage);
    return data.slice(start, end);
};

export { getPagination as g, paginationBoundaries as p, withPagination as w };
