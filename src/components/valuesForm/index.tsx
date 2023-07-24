import { useState } from 'react';

export const ValuesForm: React.FC = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [inputs, setInputs] = useState(['', '', '', '', '']);

  const handleClick = async () => {
    setIsSubmitLoading(true);

    try {
        console.log(inputs)
    //   await axios.post('https://leothesen.com/api/values', inputs);
    } catch (error) {
      console.error(error);
    }

    setIsSubmitLoading(false);
  };

  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  // Rather just have this as an onboarding screen
  // Then you can have a screen for viewing and updating values

  // 

  // use a closure, somehow? 
  const handleInputChange = (index) => (event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  return (
    <form className="space-y-4">
      {inputs.map((input, index) => (
        <input
          key={index}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={input}
          onChange={handleInputChange(index)}
        />
      ))}
      <div className="flex w-full justify-center gap-4">
        <button
          type="button"
          className={`btn-primary btn ${isSubmitLoading ? 'animate-pulse' : ''}`}
          onClick={handleClick}
          disabled={isSubmitLoading}
        >
          {isSubmitLoading ? 'Loading...' : 'Submit'}
        </button>
        <button
          type="button"
          className="btn-secondary btn"
          onClick={handleAddInput}
          disabled={isSubmitLoading}
        >
          Add Input
        </button>
      </div>
    </form>
  );
}

export default ValuesForm;