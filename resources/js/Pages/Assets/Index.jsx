import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia'; // Import Inertia to send delete request
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { assetFields } from './assetFields';

/**
 * A small sub-component that renders the asset's details as a table
 * using the fields defined in assetFields.js.
 */
function DetailTable({ asset }) {
    const fields = assetFields[asset.asset_class_id] || [];
    const details = asset.asset_detail?.details || {};
    if (fields.length === 0) {
        return (
            <p className="text-sm text-gray-500">
                No specific fields defined for this asset class.
            </p>
        );
    }

    return (
        <div className="p-3 bg-gray-50 rounded shadow-sm">
            <h5 className="text-lg font-semibold mb-3">{asset?.asset_class?.name} details</h5>
            <table className="min-w-full bg-white border border-gray-200 rounded">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-3 py-2 border-b text-left text-sm font-medium text-gray-700">
                            Field
                        </th>
                        <th className="px-3 py-2 border-b text-left text-sm font-medium text-gray-700">
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field) => (
                        <tr key={field.name}>
                            <td className="px-3 py-2 border-b font-semibold text-gray-600">
                                {field.label}
                            </td>
                            <td className="px-3 py-2 border-b text-gray-700">
                                {details[field.name] ?? 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/**
 * Expandable component for react-data-table-component.
 * Receives row data as `data` prop, then renders DetailTable.
 */
const ExpandableRow = ({ data }) => {
    return (
        <div className="py-2">
            <DetailTable asset={data} />
        </div>
    );
};

export default function Index({ auth, assets, flash }) {
    // Search term for filtering by client_id or asset class name
    const [searchTerm, setSearchTerm] = useState('');

    // For the Delete Confirmation Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [assetToDelete, setAssetToDelete] = useState(null);

    // Filter logic: we check if the client_id or asset_class name
    // contains the search term (case-insensitive).
    const filteredAssets = useMemo(() => {
        if (!searchTerm) return assets;
        return assets.filter((asset) => {
            const clientIdMatch = asset.client_id
                ?.toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const classNameMatch = asset.asset_class?.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());
            return clientIdMatch || classNameMatch;
        });
    }, [assets, searchTerm]);

    // Columns definition for react-data-table-component
    const columns = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
            width: '70px',
        },
        {
            name: 'Client ID',
            selector: (row) => row.client_id,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Asset Class',
            selector: (row) => row.asset_class?.name || 'N/A',
            sortable: true,
            wrap: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex gap-2">
                    <Link href={route('assets.edit', row.id)}>
                        <Button variant="warning" size="sm">
                            <i class="bi bi-pencil-square"> Edit</i>
                        </Button>
                    </Link>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => openDeleteModal(row.id)}
                    >
                        <i class="bi bi-trash"> Delete</i>
                    </Button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '150px',
        },
    ];

    /**
     * Opens the delete confirmation modal.
     * We store the asset ID in state to delete after user confirms.
     */
    const openDeleteModal = (id) => {
        setAssetToDelete(id);
        setShowDeleteModal(true);
    };

    /**
     * Hides the delete confirmation modal without deleting.
     */
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setAssetToDelete(null);
    };

    /**
     * Actually delete the asset via Inertia once user confirms.
     */
    const handleConfirmDelete = () => {
        if (!assetToDelete) return;

        Inertia.delete(route('assets.destroy', assetToDelete), {
            onSuccess: () => {
                // Close modal after successful delete
                setShowDeleteModal(false);
                setAssetToDelete(null);
            },
        });
    };

    // Custom styles for react-data-table-component (optional)
    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#f8fafc', // Tailwind gray-50
            },
        },
        headCells: {
            style: {
                fontWeight: '600',
                fontSize: '0.9rem',
                color: '#374151', // Tailwind gray-700
            },
        },
        cells: {
            style: {
                fontSize: '0.85rem',
                color: '#4b5563', // Tailwind gray-600
            },
        },
        rows: {
            style: {
                minHeight: '50px',
            },
        },
    };

    return (
        <AuthenticatedLayout user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Assets Management
                </h2>
            }>
            <Head title="Assets" />

            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    {/* Search Input */}
                    <input
                        type="text"
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full max-w-md"
                        placeholder="Search by Client ID or Asset Class..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <Link href={route('assets.create')} className="text-white no-underline">
                        <Button variant="primary"><i class="bi bi-plus"> Add new asset</i></Button>
                    </Link>
                </div>

                {/* Flash message */}
                {flash?.success && (
                    <div className="mb-4 text-green-600 font-semibold">
                        {flash.success}
                    </div>
                )}



                {/* Data Table */}
                <DataTable
                    columns={columns}
                    data={filteredAssets}
                    customStyles={customStyles}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    expandableRows
                    expandableRowsComponent={ExpandableRow}
                    noDataComponent="No matching assets found."
                />
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onHide={closeDeleteModal}
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this asset?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </AuthenticatedLayout>
    );
}
