import { ColumnDef } from "@tanstack/react-table";
import { FC } from "react";
import { usaSpecialOffers } from "../lib/types";

interface ColumnProps<T> {
  column: ColumnDef<T>[];
}

export const Column = <T,>({ column }: ColumnProps<T>): JSX.Element => {
  return <div>Column</div>;
};
