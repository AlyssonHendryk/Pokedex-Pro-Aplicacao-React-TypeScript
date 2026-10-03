import "./Pagination.css";


interface PaginationProps {
    page: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
}


export function Pagination({
    page,
    totalPages,
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
                Página {page} de {totalPages}
            </span>


            <button
                type="button"
                onClick={onNext}
                disabled={page === totalPages}
            >
                Próximo
            </button>

        </div>

    );

}