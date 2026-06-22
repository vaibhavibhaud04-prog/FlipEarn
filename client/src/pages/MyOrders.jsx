import React, { useEffect, useState } from 'react'
import { dummyOrders } from '../assets/assets';
import { ChevronDown, ChevronUp, Loader2Icon, Copy } from 'lucide-react';
import {format} from 'date-fns';


const MyOrders = () => {
  const currency=import.meta.env.VITE_CURRENCY || "$";
  const [orders, setOrders]=useState([]);
  const [loading, setLoading]=useState(true);
  const [expandedId, setExpandedId]=useState(null);

  const fetchOrders=async()=>{
    setOrders(dummyOrders)
    setLoading(false)
  }

  useEffect(()=>{
    fetchOrders()
  }, [])

  const mask=(val, type)=>{
    if(!val && val !== 0) return "-";
    return type.toLowerCase() === "password" ? "•".repeat(8) : String(val)
  }

  const copy= async(txt)=>{
    try{
      await navigator.clipboard.writeText(txt)
      toast.success("Copied to clipboard");
    } catch (error){
      toast.error("Copy failed");
    }
  }

  if(loading){
    return(
      <div className='h-[80vh] flex items-center justify-center'>
        <Loader2Icon className='size-7 animate-spin text-indigo-600'/>
      </div>
    )
  }

  if(!orders.length){
    return(
      <div className='px-4 md:px-16 lg:px-24 xl:px-32'>
        <div className='max-w-2xl mx-auto mt-14 bg-white rounded-xl border border-gray-200 p-8 text-center'>
          <h3 className='text-lg font-semobold'>No orders yet</h3>
          <p className='text-sm text-gray-500 mt-2'>
            You haven't purchased any listings yet
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="px-4 md:px-16 lg:px-24 xl:px-32 py-6">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

     <div className="space-y-5 max-w-5xl">
  {orders.map((order) => {
    const isExpanded = expandedId === order.id;

    return (
      <div
        key={order.id}
        className="bg-white border rounded-lg p-5 shadow-sm"
      >
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-5">
          {/* Left */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg">
              {order.listing.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              @{order.listing.username} • {order.listing.platform}
            </p>

            <div className="flex gap-2 mt-3">
              {order.listing.verified && (
                <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                  Verified
                </span>
              )}

              {order.listing.monetized && (
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                  Monetized
                </span>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="md:text-right">
            <h2 className="text-3xl font-bold">
              {currency}
              {Number(order.amount).toLocaleString()}
            </h2>

            <p className="text-sm text-gray-400">USD</p>

            <button
              onClick={() =>
                setExpandedId((prev) =>
                  prev === order.id ? null : order.id
                )
              }
              className="mt-3 border px-4 py-2 rounded flex items-center gap-2 text-sm hover:bg-gray-50 md:ml-auto"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={16} />
                  Hide Credentials
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  View Credentials
                </>
              )}
            </button>

            <p className="text-xs text-gray-400 mt-3">
              Credential Purchased{" "}
              {format(new Date(order.createdAt), "MMM d, yyyy")}
            </p>
          </div>
        </div>

        {/* Credentials */}
        {isExpanded && (
          <div className="mt-6 border-t pt-4 space-y-3">
            {order.credential.updatedCredential.map((cred) => (
              <div
                key={cred.name}
                className="bg-gray-50 rounded-md px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-sm">
                    {cred.name}
                  </p>

                  <p className="text-sm text-gray-400">
                    {mask(cred.value, cred.type)}
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(cred.value)
                  }
                  className="text-gray-500 hover:text-black"
                >
                  <Copy size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  })}
</div>
    </div>
  )
}

export default MyOrders
