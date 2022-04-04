import { r as react } from '../../../../common/index-ae389540.js';

const LoadDataAsync = (Spinner) => ({ Component, getData }) => {
    const [data, setData] = react.useState(undefined);
    if (data === undefined) {
        getData().then(data => setData(data));
        return react.createElement(Spinner, null);
    }
    return react.createElement(Component, { data: data });
};

export { LoadDataAsync };
