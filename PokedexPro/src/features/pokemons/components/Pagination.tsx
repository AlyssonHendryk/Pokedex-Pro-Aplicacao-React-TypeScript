interface PaginationProps {
  page: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function Pagination({
  page,
  onPrevious,
  onNext
}: PaginationProps) {
  return (
    <div className="pagination">

      <button
        type="button"
        onClick={onPrevious}
        disabled={page === 1}
      >
        Anterior
      </button>

      <span>
        Página {page}
      </span>

      <button
        type="button"
        onClick={onNext}
      >
        Próximo
      </button>

    </div>
  );
}