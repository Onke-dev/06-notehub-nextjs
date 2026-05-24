"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./NotesPage.module.css";
import { useState } from "react";
import Pagination from "@/components/ReactPaginate/ReactPaginate";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import fetchNotes from "@/lib/api";

function NotesClient() {
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["notes", topic, page],
    queryFn: () => fetchNotes({ search: topic, page }),
    placeholderData: keepPreviousData,
  });

  const handleDelete = () => {
    setTopic("");
  };

  const totalpage = data?.totalPages ?? 0;

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {totalpage > 0 && (
          <Pagination
            pageCount={totalpage}
            forcePage={page}
            onPageChange={setPage}
          />
        )}
        {
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        }
        {open && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </header>
      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default NotesClient;
