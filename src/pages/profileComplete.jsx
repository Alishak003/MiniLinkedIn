import { useState } from "react";
import "../css/CompleteProfile.css"; // Import the CSS
import { Camera, MapPinLine, Notebook, Notepad, UserCircle } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export function CompleteProfile() {
  const {createUserProfile} = useAuth()
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    bio: "",
    location: ""
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      bio: "",
      location: ""
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required";
    } else if (formData.bio.length < 10) {
      newErrors.bio = "Bio must be at least 10 characters";
    } else if (formData.bio.length > 200) {
      newErrors.bio = "Bio must be less than 200 characters";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e);
  };

  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault();
    if (validateForm()) {   
      const result = await createUserProfile(formData);
      if(result.success){
        navigate('/feed')
      }
      else {
        setMessage("something went wrong")
        // console.log("error: ",result.message)
      }
    }
    setLoading(false)
  };

  const completion = Math.round(
    (Object.values(formData).filter((v) => v.trim() !== "").length / 3) * 100
  );

  return (
    <div className="complete-profile-page">
      <div className="complete-profile-card">
        <h2 className="title">Complete Your Profile</h2>
        <p className="subtitle">
          Help others get to know you better by completing your profile information.
        </p>

        <form onSubmit={handleSubmit} className="form-section">
          <div className="form-field">
            <label className="label-with-icon"><img src="user.png" className="icon"/>Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={errors.fullName ? "error" : ""}
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
          </div>

          <div className="form-field">
            <label className="label-with-icon"><Notebook size={16} weight="light"/> Bio</label>
            <textarea
              value={formData.bio}
              placeholder="Tell us about yourself"
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className={errors.bio ? "error" : ""}
              maxLength={200}
            />
            <div className="field-footer">
              {errors.bio && <p className="error-text">{errors.bio}</p>}
              <span>{formData.bio.length}/200</span>
            </div>
          </div>

          <div className="form-field">
            <label className="label-with-icon"><MapPinLine size={16}/>Location</label>
            <input
              type="text"
              placeholder="City, Country"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className={errors.location ? "error" : ""}
            />
            {errors.location && <p className="error-text">{errors.location}</p>}
          </div>

          {message && <p className="message-text">{message}</p>}

          <div className="button-group">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading?'Loading':'Complete Profile'}
            </button>
            
          </div>
        </form>
        <hr className="hr"/>
        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-labels">
            <span>Profile Completion</span>
            <span>{completion}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-filled"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
