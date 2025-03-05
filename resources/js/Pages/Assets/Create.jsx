import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { ProgressBar } from 'react-bootstrap';
import { assetFields } from './assetFields';

export default function Create({ auth, assetClasses }) {
    // Inertia's useForm hook
    const { data, setData, post, errors, processing } = useForm({
        client_id: '',
        asset_class_id: '',
        details: {},
    });

    const [step, setStep] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('assets.store'));
    };

    // When user types in top-level fields (client_id, asset_class_id)
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    // For the dynamic fields in 'details'
    const handleDetailChange = (fieldName, value) => {
        setData('details', {
            ...data.details,
            [fieldName]: value,
        });
    };

    // Which fields to show based on the chosen asset_class_id
    const selectedFields = assetFields[data.asset_class_id] || [];

    return (
        <AuthenticatedLayout user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add new Asset
                </h2>
            }>

            <Head title="Add new Asset" />
            <div className="mt-6 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded">


                <ProgressBar now={(step / 3) * 100} className="mb-6" />

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* STEP 1 */}
                    {step === 1 && (
                        <div>
                            <InputLabel htmlFor="client_id" value="Client ID" />
                            <TextInput
                                id="client_id"
                                name="client_id"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.client_id}
                                onChange={handleChange}
                                required
                            />
                            <InputError message={errors.client_id} className="mt-2" />

                            <div className="mt-4 flex items-center justify-between">

                                <Link href={route('assets.index')}>
                                    <PrimaryButton variant="secondary">Cancel</PrimaryButton>
                                </Link>
                                <PrimaryButton
                                    type="button"
                                    className="ml-4"
                                    onClick={() => setStep(2)}
                                >
                                    Next
                                </PrimaryButton>
                            </div>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div>
                            <InputLabel htmlFor="asset_class_id" value="Asset Class" />
                            <select
                                id="asset_class_id"
                                name="asset_class_id"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md"
                                value={data.asset_class_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select --</option>
                                {assetClasses.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.asset_class_id} className="mt-2" />

                            <div className="mt-4 flex items-center justify-between">
                                <PrimaryButton
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </PrimaryButton>
                                <PrimaryButton
                                    type="button"
                                    className="ml-4"
                                    onClick={() => {
                                        if (!data.asset_class_id) {
                                            alert('Please select an Asset Class first.');
                                            return;
                                        }
                                        setStep(3);
                                    }}
                                >
                                    Next
                                </PrimaryButton>
                            </div>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-3">
                                Enter {assetClasses.find((ac) => ac.id == data.asset_class_id)?.name} Details
                            </h4>

                            {selectedFields.length > 0 ? (
                                selectedFields.map((field) => (
                                    <div key={field.name} className="mb-4">
                                        <InputLabel htmlFor={field.name} value={field.label} />
                                        <TextInput
                                            id={field.name}
                                            name={field.name}
                                            className="mt-1 block w-full"
                                            value={data.details[field.name] || ''}
                                            onChange={(e) =>
                                                handleDetailChange(field.name, e.target.value)
                                            }
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No specific fields found for this class.
                                </p>
                            )}

                            <InputError message={errors.details} className="mt-2" />

                            <div className="mt-4 flex items-center justify-between">
                                <PrimaryButton
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setStep(2)}
                                >
                                    Back
                                </PrimaryButton>
                                <PrimaryButton
                                    className="ml-4"
                                    disabled={processing}
                                    type="submit"
                                >
                                    Submit
                                </PrimaryButton>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
