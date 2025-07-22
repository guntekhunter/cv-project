import Button from "../../buttons/Button";
import dynamic from "next/dynamic";

const EditableCvId = dynamic(() => import("../../input/EditableCvId"), {
  ssr: false,
  loading: () => <p className="text-sm text-gray-300">Loading...</p>,
});

export default function CvCards(props: any) {
  return (
    <div
      key={props.item.id}
      className="relative rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-between bg-white"
    >
      {props.loadingId === props.item.id && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-lg">
          <span className="text-sm text-gray-700">Loading...</span>
        </div>
      )}

      <EditableCvId
        initialId={props.item.cv_name}
        cvRowId={props.item.id}
        idCv={props.item.id}
        onSuccess={(newId) => {
          props.setCv((prev: any) =>
            prev.map((cvItem: any) =>
              cvItem.id === props.item.id ? { ...cvItem, cv_id: newId } : cvItem
            )
          );
        }}
      />

      <div className="text-xs text-gray-500">
        {props.item.PersonalData?.name || "Tanpa Nama"}
      </div>
      <div className="text-xs text-gray-500">
        Dibuat pada:{" "}
        {new Date(props.item.createdAt).toLocaleDateString("id-ID")}
      </div>

      <div className="mt-4 space-y-2">
        <Button
          onClick={() => props.handleDetail(props.item.id)}
          className="w-full bg-secondary"
        >
          Lihat CV
        </Button>
        <Button
          onClick={() => props.handleDelete(props.item.id)}
          className="w-full bg-red-200 text-red-600 border-red-600 hover:bg-red-200"
        >
          Hapus
        </Button>
        {/* <Button disabled={loadingId === item.id}>Download</Button> */}
      </div>
    </div>
  );
}
