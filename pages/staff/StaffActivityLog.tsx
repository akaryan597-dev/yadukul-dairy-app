
import React from 'react';
import Card from '../../components/common/Card';
import { useData } from '../../hooks/useData';

const StaffActivityLog: React.FC = () => {
    const { staffActivities, loading } = useData();

    return (
        <Card>
            <h1 className="text-3xl font-bold text-white mb-6">Staff Activity Log</h1>
            {loading ? <p>Loading activities...</p> : (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg">
                    <thead>
                        <tr className="bg-gray-700 text-left text-gray-300 uppercase text-sm">
                            <th className="p-4">Timestamp</th>
                            <th className="p-4">Staff Member</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...staffActivities].reverse().map(activity => (
                            <tr key={activity.id} className="border-b border-gray-700 hover:bg-gray-700">
                                <td className="p-4 whitespace-nowrap">{new Date(activity.timestamp).toLocaleString()}</td>
                                <td className="p-4">{activity.staffName}</td>
                                <td className="p-4">{activity.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </Card>
    );
};

export default StaffActivityLog;
