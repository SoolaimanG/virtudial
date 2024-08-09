import { ListFilterIcon, PlusIcon } from "lucide-react";
import { CreateNumberBtn } from "../components/create-number-btn";
import { MaxScreenSize } from "../components/max-screen-size";
import { Text } from "../components/text";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { DataTable } from "../components/data-table";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { usaSpecialOffers } from "../lib/types";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { VirtuDialAPI } from "../lib/utils";
import usaFlag from "../assets/american-flag.png";
import { Img } from "react-image";
import { TablePagination } from "../components/table-pagination";
import { appConfigs } from "../lib/data";

const columns: ColumnDef<usaSpecialOffers>[] = [
  {
    accessorKey: "flag",
    header: "Flag",
    cell: () => {
      return (
        <Img src={usaFlag} alt="usa-flag" className="w-9 h-9 rounded-full" />
      );
    },
  },
  {
    accessorKey: "countryName",
    header: "Country",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "availableNumbers",
    header: "Available Numbers",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
  },
];

const UsaSpecialOffers = () => {
  const api = new VirtuDialAPI();
  const [data, setData] = useState<usaSpecialOffers[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const { data: _data, isSuccess } = useQuery({
    queryKey: ["usa-states-and-available-numbers"],
    queryFn: () => api.getUsaStatesAndAvailableNumbers(),
  });

  useEffect(() => {
    if (!isSuccess) return;

    if (!_data) return;

    setData(
      // @ts-ignore
      _data.data.map((state) => ({
        areaCode: state.areaCode,
        availableNumbers: state.availableNumbers,
        countryName: "USA",
        flag: usaFlag,
        state: state.state,
        updatedAt: state.updatedAt || "Time",
        id: state._id,
      }))
    );
    //
  }, [isSuccess]);

  return (
    <MaxScreenSize className="pt-16">
      <h1 className="md:text-5xl text-3xl bona-nova-sc-bold text-gradient">
        USA SPECIAL OFFERS
      </h1>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde ut, ipsa,
        minima quam aperiam sapiente sit nihil at ea nisi vitae magnam maxime
        possimus ad fuga expedita hic. Obcaecati hic iste, debitis illo aut
        quaerat magni nihil ratione nostrum dignissimos?
      </Text>
      <div className="flex w-full items-center justify-between mt-3">
        <h1 className="text-xl bona-nova-sc-bold">Numbers</h1>
        <CreateNumberBtn>
          <Button className="gap-2" size="sm" variant="primary">
            <PlusIcon />
            Create Number
          </Button>
        </CreateNumberBtn>
      </div>
      <Card className="p-0 mt-3 w-full rounded-sm">
        <CardContent className="p-0">
          <header className="p-2 w-full flex items-center justify-between">
            <Input
              value={
                (table.getColumn("state")?.getFilterValue() as string) ?? ""
              }
              onChange={(e) =>
                table.getColumn("state")?.setFilterValue(e.target.value)
              }
              className="h-[2rem] w-1/2"
              placeholder="Search state"
            />
            <Button
              onClick={() => table.getColumn("state")?.toggleSorting()}
              size="sm"
              className="h-8 gap-2"
              variant={
                table.getColumn("state")?.getIsSorted()
                  ? "secondary"
                  : "outline"
              }
            >
              <ListFilterIcon size={14} />
              Sort
            </Button>
          </header>
          <hr />
          <CardContent className="p-2">
            {/* @ts-ignore */}
            <DataTable table={table} />
            <TablePagination table={table} />
          </CardContent>
        </CardContent>
      </Card>
    </MaxScreenSize>
  );
};

export default UsaSpecialOffers;
