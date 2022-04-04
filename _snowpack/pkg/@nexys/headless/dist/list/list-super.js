import { r as react } from '../../../../common/index-ae389540.js';
import { w as withPagination } from '../../../../common/pagination-utils-23609481.js';

const getAttribute = (attribute, a) => {
    const ac = String(a[attribute]);
    if (typeof ac === 'number' && typeof ac === 'boolean') {
        return ac;
    }
    return String(ac).toLocaleLowerCase();
};
const getCompareAttributes = (a, b, attributeOrFunc) => {
    if (typeof attributeOrFunc === 'function') {
        const ac = attributeOrFunc(a);
        const bc = attributeOrFunc(b);
        return { ac, bc };
    }
    const ac = getAttribute(attributeOrFunc, a);
    const bc = getAttribute(attributeOrFunc, b);
    return { ac, bc };
};
const compareFunc = (a, b, attributeOrFunc) => {
    const { ac, bc } = getCompareAttributes(a, b, attributeOrFunc);
    if (ac < bc) {
        return -1;
    }
    if (ac > bc) {
        return 1;
    }
    return 0;
};
const order = (data, sortAttribute, sortDescAsc) => {
    if (!sortAttribute) {
        return data;
    }
    const ordered = data.sort((a, b) => compareFunc(a, b, sortAttribute));
    if (sortDescAsc === false) {
        return ordered.reverse();
    }
    return ordered;
};
const getSort = (def, sortAttribute) => {
    const i = def.find(x => x.name === sortAttribute);
    if (!i || !i.sort) {
        throw Error('sort attribute could not be matched');
    }
    if (typeof i.sort === 'object' && 'getAttribute' in i.sort) {
        return i.sort.getAttribute;
    }
    return sortAttribute;
};

const compareString = (main, searchString) => main.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
const toFilterArray = (filters) => Object.entries(filters).map(([k, v]) => ({
    name: k,
    value: v
}));
// above is generalization of
// const filterArray:FilterUnit<Animal>[] = Object.entries(filters).map(([k, v]) => ({name: k as keyof Animal, value: v as FilterSearchValue}))
const compare = (main, search //| Search,
) => {
    const mainType = typeof main;
    const searchType = typeof search;
    if (searchType === 'string') {
        // here casting the `main` so that it can match with the search even if not of the same type
        switch (mainType) {
            case 'string':
                return compareString(main, search);
            case 'number':
                return main === Number(search);
            default:
                return false;
        }
    }
    return false;
};
// this is a hack that will work for nested objects... leaving like this until better option
const searchInObject = (searchString, object) => JSON.stringify(object).toLowerCase().includes(searchString.toLowerCase());
// todo here unfortunately `k` cant be typed as keyof A, typescript bug/limitation?
const applyFilter = (data, filters) => {
    const filterArray = toFilterArray(filters);
    if (filterArray.length === 0) {
        return data;
    }
    return data.filter((d) => {
        return filterArray
            .map(f => {
            if (f.name === 'globalSearch' && typeof f.value === 'string') {
                return searchInObject(f.value, d);
            }
            if (f.name !== 'globalSearch') {
                const key = f.name;
                if (typeof f.value === 'object') {
                    if (typeof f.value.func === 'function' && f.value.value) {
                        if (Array.isArray(f.value.value) && f.value.value.length > 0) {
                            return f.value.func(d, f.value.value, filters);
                        }
                        else {
                            return f.value.func(d, f.value.value.value, filters);
                        }
                    }
                    return true;
                }
                return compare(d[key], f.value);
            }
            return true;
        })
            .reduce((a, b) => a && b);
    });
};
const addRemoveToArray = (v, a = []) => {
    if (!a) {
        return [v];
    }
    if (a.includes(v)) {
        const idx = a.indexOf(v);
        a.splice(idx, 1);
        return a;
    }
    a.push(v);
    return a;
};
const updateFilters = (filters, v) => {
    if (v.value === null || v.value === '') {
        delete filters[v.name];
    }
    else {
        // if object
        if (typeof v.value !== 'string') {
            if (v.type === 'category') {
                if (!filters[v.name]) {
                    filters[v.name] = { value: [], func: v.value.func };
                }
                filters[v.name].value = addRemoveToArray(v.value.value, filters[v.name].value);
                if (filters[v.name].value.length === 0) {
                    delete filters[v.name];
                }
            }
            else {
                if (!filters[v.name]) {
                    filters[v.name] = { value: null, func: v.value.func };
                }
                filters[v.name].value = v.value;
            }
        }
        else {
            // if string
            filters[v.name] = v.value;
        }
    }
    // setState({ ...state, filters, pageIdx });
    return filters;
};
const getFilterObj = (def, filterAttribute) => {
    const i = def.find(x => x.name === filterAttribute);
    if (!i || !i.filter) {
        throw Error('filter attribute could not be matched');
    }
    if (typeof i.filter === 'object' && 'func' in i.filter) {
        return {
            type: i.filter.type,
            func: i.filter.func
        };
    }
    return filterAttribute;
};
const transformFilterPropToStateFilter = (def, filters) => {
    return Object.entries(filters)
        .map(([key, value]) => {
        const filterObj = getFilterObj(def, key);
        return {
            key,
            value,
            filterObj
        };
    })
        .reduce((acc, cur) => {
        const { key } = cur;
        let filter;
        if (typeof cur.filterObj.func === 'function') {
            filter = {
                value: cur.filterObj.type === 'select'
                    ? { value: cur.value }
                    : cur.value,
                func: cur.filterObj.func
            };
        }
        else {
            filter = cur.value;
        }
        acc[key] = filter;
        return acc;
    }, {});
};

var ActionType;
(function (ActionType) {
    ActionType["FETCH_DATA_REQUEST"] = "FETCH_DATA_REQUEST";
    ActionType["FETCH_DATA_SUCCESS"] = "FETCH_DATA_SUCCESS";
    ActionType["FILTER_CHANGE"] = "FILTER_CHANGE";
    ActionType["ORDER_CHANGE"] = "ORDER_CHANGE";
    ActionType["PAGE_CHANGE"] = "PAGE_CHANGE";
})(ActionType || (ActionType = {}));

const listSuperReducer = (state, action) => {
    switch (action.type) {
        case ActionType.FETCH_DATA_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case ActionType.FETCH_DATA_SUCCESS: {
            const { data, numberOfTotalRows } = action.payload;
            return {
                ...state,
                loading: false,
                data,
                numberOfTotalRows
            };
        }
        case ActionType.FILTER_CHANGE: {
            const { filters, pageIdx } = action.payload;
            return {
                ...state,
                filters,
                pageIdx
            };
        }
        case ActionType.ORDER_CHANGE: {
            const { sortDescAsc, sortAttribute, pageIdx } = action.payload;
            return {
                ...state,
                sortDescAsc,
                sortAttribute,
                pageIdx
            };
        }
        case ActionType.PAGE_CHANGE: {
            const { pageIdx } = action.payload;
            return {
                ...state,
                pageIdx
            };
        }
    }
    // unreachable code
    // return state;
};

const getInitialState = (data, sortAttribute, sortDescAsc, filters) => ({
    data: data ? data : [],
    filters: filters || {},
    loading: false,
    numberOfTotalRows: data && data.length ? data.length : 0,
    sortAttribute,
    sortDescAsc: sortDescAsc !== undefined ? sortDescAsc : true,
    pageIdx: 1
});

const ListSuper = ({ HeaderUnit, FilterUnit, OrderController, ColCell, GlobalSearch, NoRow, Row, ListWrapper, ListContainer, ListHeader, ListBody, RecordInfo, Pagination, Loader }) => (props) => {
    const { def, config = {}, asyncData, CustomListContainer, CustomListItem } = props;
    const filtersFromProps = config.filters
        ? transformFilterPropToStateFilter(def, config.filters)
        : undefined;
    const [state, dispatch] = react.useReducer(listSuperReducer, getInitialState(props.data, config.sortAttribute, config.sortDescAsc, filtersFromProps));
    const { filters, pageIdx, sortAttribute, sortDescAsc, data, numberOfTotalRows, loading } = state;
    const nPerPage = config.nPerPage || props.nPerPage || 25;
    if (props.nPerPage) {
        console.warn('The use of nPerPage in props is deprecated. Add nPerPage to the config object prop.');
    }
    const fetchData = react.useCallback((config) => {
        if (asyncData) {
            dispatch({ type: ActionType.FETCH_DATA_REQUEST });
            asyncData({
                nPerPage,
                pageIdx: config && config.pageIdx ? config.pageIdx : pageIdx,
                filters: config && config.filters ? config.filters : filters,
                sort: {
                    attribute: config && config.sortAttribute
                        ? config.sortAttribute
                        : sortAttribute,
                    descAsc: config && typeof config.sortDescAsc !== 'undefined'
                        ? config.sortDescAsc
                        : sortDescAsc
                }
            }).then(res => {
                dispatch({
                    type: ActionType.FETCH_DATA_SUCCESS,
                    payload: { data: res.data, numberOfTotalRows: res.meta.n }
                });
            });
        }
    }, [asyncData, filters, nPerPage, pageIdx, sortAttribute, sortDescAsc]);
    react.useEffect(() => {
        fetchData();
    }, [asyncData, fetchData]);
    const handleFilterChange = (v) => {
        const newFilters = updateFilters(filters, v);
        // when a filter is applied, the page index is reset
        const pageIdx = 1;
        const config = {
            filters: newFilters,
            pageIdx
        };
        dispatch({
            type: ActionType.FILTER_CHANGE,
            payload: config
        });
        fetchData(config);
    };
    const handleFilterReset = (name) => {
        const newFilters = Object.assign({}, filters);
        delete newFilters[name];
        // when a filter is applied, the page index is reset
        const pageIdx = 1;
        const config = {
            filters: newFilters,
            pageIdx
        };
        dispatch({ type: ActionType.FILTER_CHANGE, payload: config });
        fetchData(config);
    };
    /**
     * defines order to apply
     * @param  {[type]} name    attribute/column
     * @param  {[type]} descAsc true/false - asc or desc. if null, will toggle
     * @return {[type]}         [description]
     * todo: allow custom ordering
     */
    const setOrder = (name, descAsc = null) => {
        if (descAsc === null) {
            descAsc = !sortDescAsc;
        }
        const config = { sortDescAsc: descAsc, sortAttribute: name, pageIdx: 1 };
        dispatch({
            type: ActionType.ORDER_CHANGE,
            payload: config
        });
    };
    const changePage = (pageIdx) => {
        // todo block beyond max page
        if (pageIdx > 0) {
            const config = { pageIdx };
            dispatch({ type: ActionType.PAGE_CHANGE, payload: config });
        }
    };
    const isSort = (h) => {
        return ((typeof h.sort === 'boolean' && h.sort === true) ||
            typeof h.sort === 'object');
    };
    const renderHeaders = () => {
        return def.map((h, i) => {
            const order = isSort(h) ? (react.createElement(OrderController, { descAsc: sortAttribute === h.name ? sortDescAsc : null, onClick: () => setOrder(h.name) })) : null;
            const filter = (react.createElement(FilterUnit, { key: i, filters: filters, name: h.name, filter: h.filter, onChange: handleFilterChange, onReset: handleFilterReset, debounceWait: config.debounceWait }));
            return (react.createElement(HeaderUnit, { key: i },
                h.label || '',
                " ",
                order,
                " ",
                filter));
        });
    };
    const renderBody = (data) => (react.createElement(react.Fragment, null, data.map((row, i) => (react.createElement(react.Fragment, { key: i }, CustomListItem ? (react.createElement(react.Fragment, null, CustomListContainer ? (CustomListItem(row)) : (react.createElement(Row, null,
        react.createElement(ColCell, { colSpan: def.length, style: {
                paddingLeft: 0,
                paddingRight: 0,
                borderBottom: 0
            } }, CustomListItem(row)))))) : (react.createElement(Row, null, def.map((h, j) => (react.createElement(ColCell, { key: j },
        h.render ? h.render(row) : row[h.name],
        ' '))))))))));
    const renderLoader = () => (react.createElement(Row, null,
        react.createElement(ColCell, { colSpan: def.length },
            react.createElement(Loader, null))));
    let fData = [];
    let fpData = [];
    let n = 0;
    if (!asyncData) {
        fData = applyFilter(data, filters);
        n = fData.length;
        fpData = sortAttribute
            ? withPagination(order(fData, getSort(def, sortAttribute), sortDescAsc), pageIdx, nPerPage)
            : withPagination(fData, pageIdx, nPerPage);
    }
    else {
        n = numberOfTotalRows;
    }
    const showPagination = typeof config.pagination !== 'undefined' ? config.pagination : true;
    const showRecordInfo = typeof config.recordInfo !== 'undefined' ? config.recordInfo : true;
    return (react.createElement(ListWrapper, null,
        react.createElement(GlobalSearch, { search: config.search, onChange: handleFilterChange, filters: filters, debounceWait: config.debounceWait }),
        CustomListContainer ? (react.createElement(react.Fragment, null,
            react.createElement(ListContainer, null,
                react.createElement(ListHeader, null,
                    react.createElement(Row, null, renderHeaders()))),
            CustomListContainer(renderBody(asyncData ? data : fpData)))) : (react.createElement(ListContainer, { maxHeight: config.maxHeight, stickyHeader: config.stickyHeader },
            react.createElement(ListHeader, null,
                react.createElement(Row, null, renderHeaders())),
            react.createElement(ListBody, null, loading ? renderLoader() : renderBody(asyncData ? data : fpData)))),
        showRecordInfo && (react.createElement(RecordInfo, { n: n, idx: pageIdx, nPerPage: nPerPage })),
        showPagination && n > nPerPage && (react.createElement(Pagination, { n: n, nPerPage: nPerPage, idx: pageIdx, onClick: changePage })),
        !loading && react.createElement(NoRow, { n: n })));
};

export default ListSuper;
