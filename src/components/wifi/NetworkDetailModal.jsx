function NetworkDetailModal({ onClose, network }) {
    return (
        <div className="fixed inset-0 bg-black/50 center">
            <div onClick={onClose} className="backdrop absolute inset-0"></div>

            <div className="relative text-white bg-custom-light-black w-[50%] ">
                <div className="flex gap-4 p-4 border-b-[2px] border-custom-gray ">
                    <div>
                        <button
                            className="text-sm bg-custom-gray px-4 py-1 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="flex-1 text-center">network</div>
                    <div>
                        <button className="text-sm bg-custom-gray px-4 py-1 rounded">Apply</button>
                    </div>
                </div>

                <div className="p-6">asdasdasdasdasdasdasd</div>
            </div>
        </div>
    );
}

export default NetworkDetailModal;
