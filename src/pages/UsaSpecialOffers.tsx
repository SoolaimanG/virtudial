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
} from "@tanstack/react-table";
import { usaSpecialOffers } from "../lib/types";
import { useState } from "react";

const columns: ColumnDef<usaSpecialOffers>[] = [
  {
    accessorKey: "flag",
    header: "Flag",
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
    accessorKey: "totalNumbers",
    header: "Available Numbers",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
  },
];

const data: usaSpecialOffers[] = [
  {
    areaCode: "402",
    countryName: "USA",
    flag: "",
    id: "id",
    state: "Arizona",
    totalNumbers: 40,
    updatedAt: "",
  },
];

const UsaSpecialOffers = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    // onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    state: {
      //   sorting,
      columnFilters,
      //   columnVisibility,
    },
  });

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
          <Button className="gap-2" size="sm" variant="secondary">
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
            <Button size="sm" className="h-8 gap-2" variant="outline">
              <ListFilterIcon size={14} />
              Sort
            </Button>
          </header>
          <hr />
          <CardContent className="p-2">
            <DataTable table={table} />
          </CardContent>
        </CardContent>
      </Card>
    </MaxScreenSize>
  );
};

export default UsaSpecialOffers;
