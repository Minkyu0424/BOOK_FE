import {
  Detail,
  ListResponseContentsDto,
  PageResponseBookDto,
  PageResponsePublisherDto,
} from "@/types/dto";
import { getRequest } from "./commonGet";

export const getPublishers = () =>
  getRequest<PageResponsePublisherDto>("/publishers");

export const getBookContents = (isbn: string) =>
  getRequest<ListResponseContentsDto>(`books/${isbn}/contents`);

export const getBirthdayBooks = (date: string) =>
  getRequest<PageResponseBookDto>(
    `/books?page=0&limit=10&publishedDate=${"2025-06-20"}&orderBy=PublishedDate&direction=desc`
  );

export const getBookDetail = (isbn: number) =>
  getRequest<Detail>(`/books/{isbn}?isbn=${isbn}`);
