import { useState } from "react";
import {
  Store,
  Truck,
  MapPin,
  Clock,
  Save,
  Lock,
  User,
  Bell,
  ShieldCheck,
} from "lucide-react";

function AdminSettings() {
  const [activeSection, setActiveSection] = useState("business");

  const [settings, setSettings] = useState({
    businessName: "Nomiani Skincare",

    address:
      "Pretoria, Gauteng, South Africa",

    deliveryRate: "1.20",

    minimumDeliveryFee: "0",

    openingTime: "08:00",

    closingTime: "17:00",

    phone: "012 000 0000",

    email: "info@haloskin.co.za",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    /*
      API CONNECTION WILL COME LATER.

      Eventually this will send the settings to:

      PUT /api/admin/settings/
    */

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <>
      {/* =========================================================
          PAGE HEADER
      ========================================================== */}

      <div className="mb-8">

        <h1
          className="text-3xl lg:text-4xl font-bold text-[#201B11]"
          style={{ fontFamily: "Montserrat" }}
        >
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your Nomiani Skincare business and admin settings.
        </p>

      </div>


      {/* =========================================================
          SETTINGS LAYOUT
      ========================================================== */}

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">


        {/* =======================================================
            SETTINGS SIDEBAR
        ======================================================== */}

        <div className="bg-white border border-[#D4C5AB] rounded-xl p-3 shadow-[0_4px_20px_rgba(120,89,0,0.05)] h-fit">

          <SettingsTab
            icon={Store}
            label="Business"
            active={activeSection === "business"}
            onClick={() => setActiveSection("business")}
          />

          <SettingsTab
            icon={Truck}
            label="Delivery"
            active={activeSection === "delivery"}
            onClick={() => setActiveSection("delivery")}
          />

          <SettingsTab
            icon={Bell}
            label="Notifications"
            active={activeSection === "notifications"}
            onClick={() => setActiveSection("notifications")}
          />

          <SettingsTab
            icon={User}
            label="Account"
            active={activeSection === "account"}
            onClick={() => setActiveSection("account")}
          />

          <SettingsTab
            icon={ShieldCheck}
            label="Security"
            active={activeSection === "security"}
            onClick={() => setActiveSection("security")}
          />

        </div>


        {/* =======================================================
            SETTINGS CONTENT
        ======================================================== */}

        <div>


          {/* =====================================================
              BUSINESS SETTINGS
          ====================================================== */}

          {activeSection === "business" && (

            <form
              onSubmit={handleSave}
              className="space-y-6"
            >

              <SettingsCard
                title="Business Information"
                description="Basic information about your Nomiani Skincare business."
                icon={Store}
              >

                <div className="grid md:grid-cols-2 gap-5">

                  <InputField
                    label="Business Name"
                    value={settings.businessName}
                    onChange={(value) =>
                      handleChange("businessName", value)
                    }
                  />

                  <InputField
                    label="Phone Number"
                    value={settings.phone}
                    onChange={(value) =>
                      handleChange("phone", value)
                    }
                  />

                  <InputField
                    label="Email Address"
                    value={settings.email}
                    onChange={(value) =>
                      handleChange("email", value)
                    }
                  />

                </div>


                <div className="mt-5">

                  <label className="block text-sm font-semibold text-[#201B11] mb-2">
                    Business Address
                  </label>

                  <div className="relative">

                    <MapPin
                      size={18}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <textarea
                      value={settings.address}
                      onChange={(event) =>
                        handleChange(
                          "address",
                          event.target.value
                        )
                      }
                      rows="3"
                      className="w-full pl-10 pr-4 py-3 bg-[#FFF8F2] border border-[#D4C5AB] rounded-lg outline-none resize-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 text-sm"
                    />

                  </div>

                </div>

              </SettingsCard>


              {/* Business Hours */}

              <SettingsCard
                title="Business Hours"
                description="Set the operating hours shown to customers."
                icon={Clock}
              >

                <div className="grid md:grid-cols-2 gap-5">

                  <InputField
                    label="Opening Time"
                    type="time"
                    value={settings.openingTime}
                    onChange={(value) =>
                      handleChange(
                        "openingTime",
                        value
                      )
                    }
                  />

                  <InputField
                    label="Closing Time"
                    type="time"
                    value={settings.closingTime}
                    onChange={(value) =>
                      handleChange(
                        "closingTime",
                        value
                      )
                    }
                  />

                </div>

              </SettingsCard>


              {/* Save */}

              <SaveButton saved={saved} />

            </form>
          )}


          {/* =====================================================
              DELIVERY SETTINGS
          ====================================================== */}

          {activeSection === "delivery" && (

            <form
              onSubmit={handleSave}
              className="space-y-6"
            >

              <SettingsCard
                title="Delivery Settings"
                description="Configure how delivery fees are calculated."
                icon={Truck}
              >

                <div className="grid md:grid-cols-2 gap-5">

                  <InputField
                    label="Delivery Rate per KM"
                    prefix="R"
                    suffix="/ km"
                    type="number"
                    step="0.01"
                    value={settings.deliveryRate}
                    onChange={(value) =>
                      handleChange(
                        "deliveryRate",
                        value
                      )
                    }
                  />

                  <InputField
                    label="Minimum Delivery Fee"
                    prefix="R"
                    type="number"
                    step="0.01"
                    value={settings.minimumDeliveryFee}
                    onChange={(value) =>
                      handleChange(
                        "minimumDeliveryFee",
                        value
                      )
                    }
                  />

                </div>


                <div className="mt-6 bg-[#FFF8F2] border border-[#D4C5AB] rounded-xl p-5">

                  <div className="flex gap-3">

                    <div className="w-10 h-10 rounded-full bg-[#F3E6C5] text-[#7C3AED] flex items-center justify-center shrink-0">

                      <Truck size={19} />

                    </div>

                    <div>

                      <h3 className="font-semibold text-[#201B11]">
                        Current Delivery Formula
                      </h3>

                      <p className="text-sm text-gray-600 mt-1">
                        Delivery Fee = Distance × R
                        {settings.deliveryRate || "0.00"}
                      </p>

                      <p className="text-xs text-gray-500 mt-2">
                        Google Maps distance calculation can be
                        connected later.
                      </p>

                    </div>

                  </div>

                </div>

              </SettingsCard>


              <SettingsCard
                title="Collection"
                description="Your collection location is currently fixed."
                icon={MapPin}
              >

                <div className="bg-[#F9F2EC] border border-[#D4C5AB] rounded-lg p-4">

                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">
                    Collection Address
                  </p>

                  <p className="font-semibold text-[#201B11]">
                    {settings.address}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Customers can collect their orders from this
                    location.
                  </p>

                </div>

              </SettingsCard>


              <SaveButton saved={saved} />

            </form>
          )}


          {/* =====================================================
              NOTIFICATIONS
          ====================================================== */}

          {activeSection === "notifications" && (

            <SettingsCard
              title="Notifications"
              description="Choose which notifications the admin should receive."
              icon={Bell}
            >

              <div className="space-y-4">

                <ToggleSetting
                  title="New Orders"
                  description="Receive a notification when a new order is placed."
                  defaultChecked
                />

                <ToggleSetting
                  title="Low Stock"
                  description="Get notified when a product is running low."
                  defaultChecked
                />

                <ToggleSetting
                  title="Out of Stock"
                  description="Get notified when a product becomes unavailable."
                  defaultChecked
                />

                <ToggleSetting
                  title="Customer Messages"
                  description="Receive notifications when customers contact Nomiani Skincare."
                  defaultChecked
                />

              </div>

            </SettingsCard>
          )}


          {/* =====================================================
              ACCOUNT
          ====================================================== */}

          {activeSection === "account" && (

            <div className="space-y-6">

              <SettingsCard
                title="Admin Account"
                description="Manage the administrator account."
                icon={User}
              >

                <div className="flex items-center gap-4">

                  <div className="w-16 h-16 rounded-full bg-[#F3E6C5] text-[#7C3AED] flex items-center justify-center text-xl font-bold">
                    AD
                  </div>

                  <div>

                    <h3 className="font-semibold text-[#201B11]">
                      Nomiani Skincare Admin
                    </h3>

                    <p className="text-sm text-gray-500">
                      Administrator
                    </p>

                  </div>

                </div>

              </SettingsCard>


              <SettingsCard
                title="Change Password"
                description="Update the password used to access the admin dashboard."
                icon={Lock}
              >

                <div className="space-y-5">

                  <InputField
                    label="Current Password"
                    type="password"
                  />

                  <InputField
                    label="New Password"
                    type="password"
                  />

                  <InputField
                    label="Confirm New Password"
                    type="password"
                  />

                </div>

                <button
                  type="button"
                  className="mt-6 px-5 py-2.5 bg-[#7C3AED] text-white rounded-lg font-semibold text-sm hover:bg-[#4C1D95] transition"
                >
                  Update Password
                </button>

              </SettingsCard>

            </div>
          )}


          {/* =====================================================
              SECURITY
          ====================================================== */}

          {activeSection === "security" && (

            <SettingsCard
              title="Security"
              description="Security information for your Nomiani Skincare admin account."
              icon={ShieldCheck}
            >

              <div className="space-y-4">

                <SecurityItem
                  title="JWT Authentication"
                  description="Your admin API uses secure JWT authentication."
                />

                <SecurityItem
                  title="Protected Admin Routes"
                  description="Admin endpoints require authentication."
                />

                <SecurityItem
                  title="Secure API Connection"
                  description="Production API requests should use HTTPS."
                />

              </div>

            </SettingsCard>
          )}

        </div>

      </div>

    </>
  );
}


/* =========================================================
   SETTINGS TAB
========================================================= */

function SettingsTab({
  icon: Icon,
  label,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
        active
          ? "bg-[#F3E6C5] text-[#7C3AED] font-semibold"
          : "text-gray-600 hover:bg-[#FFF8F2] hover:text-[#7C3AED]"
      }`}
    >

      <Icon size={19} />

      {label}

    </button>
  );
}


/* =========================================================
   SETTINGS CARD
========================================================= */

function SettingsCard({
  title,
  description,
  icon: Icon,
  children,
}) {
  return (
    <div className="bg-white border border-[#D4C5AB] rounded-xl shadow-[0_4px_20px_rgba(120,89,0,0.05)] overflow-hidden">

      <div className="p-5 lg:p-6 border-b border-[#D4C5AB]">

        <div className="flex items-start gap-3">

          <div className="w-10 h-10 rounded-full bg-[#F3E6C5] text-[#7C3AED] flex items-center justify-center shrink-0">

            <Icon size={19} />

          </div>

          <div>

            <h2
              className="text-xl font-semibold text-[#201B11]"
              style={{ fontFamily: "Montserrat" }}
            >
              {title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {description}
            </p>

          </div>

        </div>

      </div>

      <div className="p-5 lg:p-6">
        {children}
      </div>

    </div>
  );
}


/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  value = "",
  onChange = () => {},
  type = "text",
  prefix,
  suffix,
  step,
}) {
  return (
    <div>

      <label className="block text-sm font-semibold text-[#201B11] mb-2">
        {label}
      </label>

      <div className="relative">

        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {prefix}
          </span>
        )}

        <input
          type={type}
          value={value}
          step={step}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={`w-full h-11 ${
            prefix ? "pl-8" : "pl-3"
          } ${
            suffix ? "pr-16" : "pr-3"
          } bg-[#FFF8F2] border border-[#D4C5AB] rounded-lg outline-none text-sm focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10`}
        />

        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {suffix}
          </span>
        )}

      </div>

    </div>
  );
}


/* =========================================================
   TOGGLE
========================================================= */

function ToggleSetting({
  title,
  description,
  defaultChecked = false,
}) {
  const [enabled, setEnabled] =
    useState(defaultChecked);

  return (
    <div className="flex items-center justify-between gap-5 p-4 bg-[#FFF8F2] rounded-lg border border-[#D4C5AB]">

      <div>

        <h3 className="font-semibold text-[#201B11] text-sm">
          {title}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {description}
        </p>

      </div>

      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
          enabled
            ? "bg-[#7C3AED]"
            : "bg-gray-300"
        }`}
      >

        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
            enabled
              ? "translate-x-6"
              : "translate-x-1"
          }`}
        />

      </button>

    </div>
  );
}


/* =========================================================
   SECURITY ITEM
========================================================= */

function SecurityItem({
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[#FFF8F2] rounded-lg border border-[#D4C5AB]">

      <ShieldCheck
        size={20}
        className="text-emerald-600 mt-0.5"
      />

      <div>

        <h3 className="font-semibold text-[#201B11] text-sm">
          {title}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {description}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   SAVE BUTTON
========================================================= */

function SaveButton({ saved }) {
  return (
    <div className="flex justify-end">

      <button
        type="submit"
        className="flex items-center gap-2 px-6 py-3 bg-[#7C3AED] text-white rounded-lg font-semibold text-sm hover:bg-[#4C1D95] transition shadow-sm"
      >

        <Save size={18} />

        {saved ? "Settings Saved" : "Save Changes"}

      </button>

    </div>
  );
}


export default AdminSettings;

