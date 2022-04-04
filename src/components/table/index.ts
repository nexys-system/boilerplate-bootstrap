import SuperList from "@nexys/headless/dist/list/list-super";
import {
  GlobalSearch,
  HeaderUnit,
  FilterUnit,
  OrderController,
  Row,
  ColCell,
  RecordInfo,
  NoRow,
  ListWrapper,
  ListContainer,
  ListHeader,
  ListBody,
  Loader,
} from "./ui";

import Pagination from "./ui/pagination";

const List = <A>() =>
  SuperList<A>({
    HeaderUnit,
    FilterUnit,
    OrderController,
    ColCell,
    GlobalSearch,
    NoRow,
    Row,
    ListWrapper,
    ListContainer,
    ListHeader,
    ListBody,
    RecordInfo,
    Pagination,
    Loader,
  });

export default List;
